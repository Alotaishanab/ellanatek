require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const path = require('path');
const config = require('./config'); // Import your config file

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve WebGL files from the 'assets' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mycompany', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define schema and model
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  businessName: String,
  inquiryType: String,
  message: String,
});
const Contact = mongoose.model('Contact', contactSchema);

// Set up OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
    config.oauthClientId,
    config.oauthClientSecret,
    config.oauthRedirectUri
);
oAuth2Client.setCredentials({ refresh_token: config.oauthRefreshToken });

// Create a transporter with OAuth2
async function createTransporter() {
    const accessToken = await oAuth2Client.getAccessToken();

    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'info@admotionsa.com', // Use the correct sending email address
            clientId: config.oauthClientId,
            clientSecret: config.oauthClientSecret,
            refreshToken: config.oauthRefreshToken,
            accessToken: accessToken.token,
        },
    });
}

// Handle contact form submission
app.post('/api/contact', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, businessName, inquiryType, message } = req.body;
    console.log('Received request:', req.body);

    try {
        const newContact = new Contact({ firstName, lastName, email, phoneNumber, businessName, inquiryType, message });
        await newContact.save();
        console.log('Saved new contact to MongoDB');

        const transporter = await createTransporter();

        // Send email to the user
        const userMailOptions = {
            from: 'info@admotionsa.com', // The sender email address
            to: email,
            subject: 'Welcome to AdMotion',
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; text-align: center;">
                <h1><strong>Dear ${firstName},</strong></h1>
                <p>Welcome to AdMotion! We are thrilled to have you with us. Thank you for reaching out to us.</p>
                <p>We have received your message and appreciate your interest in our mobile advertising solutions. Our team will review your inquiry and get back to you shortly.</p>
                <p><strong><em>Where your brand is everywhere and seen by all.</em></strong></p>
                <p><em>Best regards,<br/>The AdMotion Team</em></p>
                <p style="font-size: 12px; color: grey; text-align: center; margin-top: 10px;">
                  This is an automated response. Please do not reply to this email.
                </p>
              </div>
            `,
        };

        await transporter.sendMail(userMailOptions);
        console.log('Email sent to user');

        // Send email to the company
        const companyMailOptions = {
            from: 'info@admotionsa.com', // The sender email address
            to: config.companyEmail,
            subject: 'New Contact Form Submission',
            text: `New contact form submission received:\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nBusiness Name: ${businessName}\nInquiry Type: ${inquiryType}\nMessage: ${message}\n\nPlease follow up with this inquiry as soon as possible.`,
        };

        await transporter.sendMail(companyMailOptions);
        console.log('Email sent to company');
        
        res.send('Message received and emails sent');
    } catch (error) {
        console.error('Error processing request:', error);
        if (!res.headersSent) { // Ensure response is sent only once
            res.status(500).send('Internal server error');
        }
    }
});

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
