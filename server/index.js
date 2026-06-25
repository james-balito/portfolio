const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { Resend } = require('resend');
require('dotenv').config();

if (!process.env.RESEND_API_KEY) {
    console.error('FATAL: RESEND_API_KEY is not set in environment variables');
    process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ DEBUG: Log ALL incoming requests
app.use((req, res, next) => {
    console.log('\n==================== INCOMING REQUEST ====================');
    console.log(`⏰ Time: ${new Date().toISOString()}`);
    console.log(`📡 Method: ${req.method}`);
    console.log(`🔗 URL: ${req.url}`);
    console.log(`🌐 Origin: ${req.headers.origin || 'No origin header'}`);
    console.log(`📱 User-Agent: ${req.headers['user-agent']}`);
    console.log(`📋 Content-Type: ${req.headers['content-type']}`);
    console.log(`🔑 API Key Present: ${!!process.env.RESEND_API_KEY}`);
    console.log('📨 Headers:', JSON.stringify(req.headers, null, 2));
    console.log('========================================================\n');
    next();
});

const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ SIMPLIFIED CORS - Most permissive for debugging
app.use(cors({
    origin: '*', // TEMPORARY: Allow all origins for debugging
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    credentials: false, // Set to false when using origin: '*'
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// ✅ Handle preflight requests explicitly
app.options('*', (req, res) => {
    console.log('🛫 Preflight request handled');
    res.status(204).send();
});

app.use(express.json());

// ✅ Health check with CORS test
app.get('/api/test', (req, res) => {
    console.log('✅ Health check called');
    res.json({ 
        message: 'Backend is running!',
        timestamp: new Date().toISOString(),
        origin: req.headers.origin || 'No origin',
        cors: 'enabled for all origins'
    });
});

// ✅ Simple test POST endpoint
app.post('/api/test-post', (req, res) => {
    console.log('✅ Test POST received:', req.body);
    res.json({ 
        message: 'POST test successful!',
        receivedData: req.body,
        timestamp: new Date().toISOString()
    });
});

// ✅ Rate limiter
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // Increased for testing
    message: {
        error: 'Too many messages sent. Please wait 15 minutes before trying again.'
    }
});

// ✅ Utility functions
const escapeHtml = (str) => {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
};

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ✅ Contact endpoint with extensive logging
app.post('/api/contact', contactLimiter, async (req, res) => {
    console.log('\n==================== CONTACT FORM SUBMISSION ====================');
    console.log('📨 Body received:', JSON.stringify(req.body, null, 2));
    console.log('📨 Content-Type:', req.headers['content-type']);
    
    try {
        const { name, email, subject, message } = req.body;

        // Log what we received
        console.log('📦 Parsed fields:', { name, email, subject, message });

        if (!name || !email || !subject || !message) {
            console.log('❌ Missing fields:', {
                name: !!name,
                email: !!email,
                subject: !!subject,
                message: !!message
            });
            return res.status(400).json({ 
                error: 'All fields are required',
                received: { name, email, subject, message }
            });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        if (name.length > 100 || subject.length > 200 || message.length > 5000) {
            return res.status(400).json({ error: 'One or more fields exceed the maximum allowed length' });
        }

        console.log('📧 Attempting to send email...');

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact Form <onboarding@resend.dev>',
            to: 'jamesbalito@gmail.com',
            replyTo: email,
            subject: `Portfolio Contact: ${escapeHtml(subject)}`,
            html: `<h1>New Contact Form Message</h1>
                   <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                   <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                   <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
                   <p><strong>Message:</strong></p>
                   <p>${escapeHtml(message)}</p>`
        });

        if (error) {
            console.error('❌ Resend error:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }

        console.log('✅ Email sent! ID:', data?.id);
        res.json({ message: 'Email sent successfully!', success: true });

    } catch (err) {
        console.error('❌ Server error:', err);
        res.status(500).json({ 
            error: 'Server error', 
            details: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});

// ✅ Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log('\n🚀 SERVER STARTED SUCCESSFULLY');
    console.log(`📡 Internal: http://localhost:${PORT}`);
    console.log(`📡 External: http://0.0.0.0:${PORT}`);
    console.log(`📡 Test endpoints:`);
    console.log(`   GET  http://localhost:${PORT}/api/test`);
    console.log(`   POST http://localhost:${PORT}/api/test-post`);
    console.log(`   POST http://localhost:${PORT}/api/contact`);
    console.log('================================================\n');
});