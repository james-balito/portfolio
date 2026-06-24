const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
// Update CORS for production
const allowedOrigins = [
    'http://localhost:5173',                              // Local dev
    'http://localhost:3000',                              // Alternative local
    'https://james-balito.vercel.app',                  // Vercel URL (update this)
    'https://james-balito.github.io',                    // GitHub Pages (if used)
];


// Middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, Postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            callback(null, true); // Temporarily allow all for testing
            // Change to: callback(new Error('Not allowed by CORS')) for production
        }
    },
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is running!' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    console.log('📨 Received contact form submission');

    try {
        const { name, email, subject, message } = req.body;
        console.log('📦 From:', name, '-', email);

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Initialize Resend
        const resend = new Resend(process.env.RESEND_API_KEY);

        console.log('📧 Sending email...');

        // Send email with proper error handling
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact Form <onboarding@resend.dev>',
            to: 'jamesbalito@gmail.com',
            replyTo: email,
            subject: `Portfolio : ${subject}`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
                
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                
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
                    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
                }
                
                .header {
                    background: linear-gradient(135deg, #1a1a2e, #16213e);
                    padding: 30px;
                    text-align: center;
                    border-bottom: 1px solid #2a2a2a;
                }
                
                .header-icon {
                    font-size: 40px;
                    margin-bottom: 12px;
                }
                
                .header h2 {
                    color: #60a5fa;
                    font-size: 24px;
                    font-weight: 700;
                    margin: 0;
                    letter-spacing: -0.5px;
                }
                
                .header .badge {
                    display: inline-block;
                    background: rgba(96, 165, 250, 0.1);
                    color: #60a5fa;
                    border: 1px solid rgba(96, 165, 250, 0.2);
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                    margin-top: 10px;
                    letter-spacing: 0.5px;
                }
                
                .content {
                    padding: 30px;
                }
                
                .field {
                    background: #1a1a1a;
                    border: 1px solid #2a2a2a;
                    border-radius: 12px;
                    padding: 16px;
                    margin-bottom: 16px;
                    transition: border-color 0.3s;
                }
                
                .field:hover {
                    border-color: #3a3a3a;
                }
                
                .field-label {
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    color: #60a5fa;
                    font-weight: 600;
                    margin-bottom: 8px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                
                .field-label .emoji {
                    font-size: 14px;
                }
                
                .field-value {
                    color: #e5e5e5;
                    font-size: 15px;
                    font-weight: 400;
                    word-break: break-word;
                }
                
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
                
                .divider {
                    border: none;
                    border-top: 1px solid #2a2a2a;
                    margin: 24px 0;
                }
                
                .footer {
                    background: #0f0f0f;
                    padding: 20px 30px;
                    text-align: center;
                    border-top: 1px solid #2a2a2a;
                }
                
                .footer-text {
                    color: #666;
                    font-size: 12px;
                    margin: 0;
                }
                
                .footer-link {
                    color: #60a5fa;
                    text-decoration: none;
                    font-weight: 600;
                }
                
                .timestamp {
                    color: #555;
                    font-size: 11px;
                    margin-top: 8px;
                }
                
                @media (max-width: 600px) {
                    body {
                        padding: 20px 10px;
                    }
                    
                    .container {
                        border-radius: 12px;
                    }
                    
                    .header {
                        padding: 20px;
                    }
                    
                    .content {
                        padding: 20px;
                    }
                    
                    .header h2 {
                        font-size: 20px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- Header -->
                <div class="header">
                    <div class="header-icon">📬</div>
                    <h2>New Portfolio Contact</h2>
                    <div class="badge">✦ New Message</div>
                </div>
                
                <!-- Content -->
                <div class="content">
                    <!-- From Field -->
                    <div class="field">
                        <div class="field-label">
                            <span class="emoji">👤</span> From
                        </div>
                        <div class="field-value">${name}</div>
                    </div>
                    
                    <!-- Email Field -->
                    <div class="field">
                        <div class="field-label">
                            <span class="emoji">📧</span> Email
                        </div>
                        <div class="field-value">
                            <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">
                                ${email}
                            </a>
                        </div>
                    </div>
                    
                    <!-- Subject Field -->
                    <div class="field">
                        <div class="field-label">
                            <span class="emoji">📌</span> Subject
                        </div>
                        <div class="field-value">${subject}</div>
                    </div>
                    
                    <!-- Divider -->
                    <hr class="divider">
                    
                    <!-- Message Field -->
                    <div class="field-label" style="margin-bottom: 8px;">
                        <span class="emoji">💬</span> Message
                    </div>
                    <div class="message-box">
                        ${message}
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="footer">
                    <p class="footer-text">
                        Sent from your 
                        <a href="#" class="footer-link">Portfolio Contact Form</a>
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
            console.error('❌ Resend error:', error);
            return res.status(500).json({
                error: 'Failed to send email',
                details: error.message
            });
        }

        console.log('✅ Email sent successfully!');
        if (data) {
            console.log('📧 Response:', JSON.stringify(data, null, 2));
        }

        res.json({
            message: 'Email sent successfully!',
            success: true
        });

    } catch (error) {
        console.error('❌ Server error:', error.message);
        res.status(500).json({
            error: 'Failed to send email',
            details: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Test at http://localhost:${PORT}/api/test`);
});