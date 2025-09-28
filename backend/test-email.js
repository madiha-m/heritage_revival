const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');

// Email transporter setup (same as in members.js)
console.log('EMAIL_HOST:', process.env.EMAIL_HOST || 'Not set (defaulting to smtp.gmail.com)');
console.log('EMAIL_PORT:', process.env.EMAIL_PORT || 'Not set (defaulting to 587)');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Missing');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set (length: ' + process.env.EMAIL_PASS.length + ')' : 'Missing');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Test function
async function testEmail() {
    try {
        // Verify connection
        await transporter.verify();
        console.log('SMTP connection verified successfully.');

        // Send a test email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to self for testing
            subject: 'Test Email from Heritage Revival Backend',
            text: 'This is a test email to verify Nodemailer configuration.'
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Test email sent successfully:', info.messageId);
    } catch (error) {
        console.error('Email test failed:', error);
    } finally {
        process.exit(0);
    }
}

testEmail();
