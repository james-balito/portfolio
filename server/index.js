const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { Resend } = require('resend');
require('dotenv').config();

// ✅ Validate required env vars at startup — fail fast, not silently
if (!process.env.RESEND_API_KEY) {
    console.error('FATAL: RESEND_API_KEY is not set in environment variables');
    process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Initialize Resend once at module scope — not inside the handler
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Locked CORS — only allow your actual frontend origins
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://james-balito.vercel.app',
    'https://james-balito.github.io',
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (Postman, curl, native mobile apps)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn(`CORS blocked request from: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json());

// ✅ Rate limiter — 5 submissions per IP per 15 minutes
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: 'Too many messages sent. Please wait 15 minutes before trying again.'
    }
});

// ✅ HTML escape utility — prevents XSS via injected content in email
const escapeHtml = (str) => {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
};

// ✅ Basic email regex validator for server-side check
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Health check route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is running!' });
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
    console.log('📨 Received contact form submission');

    try {
        const { name, email, subject, message } = req.body;

        // ✅ Validate all fields are present
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // ✅ Server-side email format validation
        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        // ✅ Field length limits — prevent payload bloat
        if (name.length > 100 || subject.length > 200 || message.length > 5000) {
            return res.status(400).json({ error: 'One or more fields exceed the maximum allowed length' });
        }

        console.log(`📦 From: ${name} <${email}>`);

        // ✅ Escape all user input before injecting into HTML email
        const safeName    = escapeHtml(name);
        const safeEmail   = escapeHtml(email);
        const safeSubject = escapeHtml(subject);
        const safeMessage = escapeHtml(message);

        console.log('📧 Sending email via Resend...');

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact Form <onboarding@resend.dev>',
            to: 'jamesbalito@gmail.com',
            replyTo: email, // raw email for reply-to header is fine
            subject: `Portfolio : ${safeSubject}`,
            html: `
<!DOCTYPE html>
<html>
<head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #0a0a0a;
            color: #e5e5e5;
            padding: 40px 20px;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(145deg, #111111, #1a1a1a);
            border: 1px solid #2a2a2a;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(0,0,0,0.3);
        }
        .header {
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            padding: 30px;
            text-align: center;
            border-bottom: 1px solid #2a2a2a;
        }
        .header-icon { font-size: 40px; margin-bottom: 12px; }
        .header h2 {
            color: #60a5fa;
            font-size: 24px;
            font-weight: 700;
            margin: 0;
            letter-spacing: -0.5px;
        }
        .header .badge {
            display: inline-block;
            background: rgba(96,165,250,0.1);
            color: #60a5fa;
            border: 1px solid rgba(96,165,250,0.2);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin-top: 10px;
            letter-spacing: 0.5px;
        }
        .content { padding: 30px; }
        .field {
            background: #1a1a1a;
            border: 1px solid #2a2a2a;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 16px;
        }
        .field-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            color: #60a5fa;
            font-weight: 600;
            margin-bottom: 8px;
        }
        .field-value { color: #e5e5e5; font-size: 15px; word-break: break-word; }
        .message-box {
            background: #0f0f0f;
            border: 1px solid #333;
            border-radius: 12px;
            padding: 20px;
            margin-top: 8px;
            white-space: pre-wrap;
            word-break: break-word;
            color: #d1d5db;
            font-size: 14px;
            line-height: 1.7;
        }
        .divider { border: none; border-top: 1px solid #2a2a2a; margin: 24px 0; }
        .footer {
            background: #0f0f0f;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #2a2a2a;
        }
        .footer-text { color: #666; font-size: 12px; }
        .footer-link { color: #60a5fa; text-decoration: none; font-weight: 600; }
        .timestamp { color: #555; font-size: 11px; margin-top: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-icon">📬</div>
            <h2>New Portfolio Contact</h2>
            <div class="badge">✦ New Message</div>
        </div>
        <div class="content">
            <div class="field">
                <div class="field-label">👤 From</div>
                <div class="field-value">${safeName}</div>
            </div>
            <div class="field">
                <div class="field-label">📧 Email</div>
                <div class="field-value">
                    <a href="mailto:${safeEmail}" style="color:#60a5fa;text-decoration:none;">${safeEmail}</a>
                </div>
            </div>
            <div class="field">
                <div class="field-label">📌 Subject</div>
                <div class="field-value">${safeSubject}</div>
            </div>
            <hr class="divider">
            <div class="field-label" style="margin-bottom:8px;">💬 Message</div>
            <div class="message-box">${safeMessage}</div>
        </div>
        <div class="footer">
            <p class="footer-text">
                Sent from your <a href="#" class="footer-link">Portfolio Contact Form</a>
            </p>
            <p class="timestamp">
                ${new Date().toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZoneName: 'short'
                })}
            </p>
        </div>
    </div>
</body>
</html>
            `
        });

        if (error) {
            console.error('❌ Resend API error:', error);
            return res.status(500).json({
                error: 'Failed to send email',
                details: error.message
            });
        }

        console.log('✅ Email sent successfully! ID:', data?.id);
        res.json({ message: 'Email sent successfully!', success: true });

    } catch (err) {
        console.error('❌ Server error:', err.message);
        res.status(500).json({
            error: 'Failed to send email',
            details: err.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Health check: http://localhost:${PORT}/api/test`);
});