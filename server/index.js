const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Allows your Vite frontend to talk to this server
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
        console.log('📦 Data:', { name, email, subject });

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Initialize Resend with API key (safe on server!)
        const resend = new Resend(process.env.RESEND_API_KEY);

        console.log('📧 Sending email...');

        // Send email
        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'jamesbalito@gmail.com',
            replyTo: email,
            subject: `Portfolio Contact from: ${name}`,
            html: `
                <h2>Email Message</h2>
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        console.log('✅ Email sent:', data.id);

        res.json({ 
            message: 'Email sent successfully!',
            id: data.id 
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ 
            error: 'Failed to send email',
            details: error.message 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📧 Test at http://localhost:${PORT}/api/test`);
});