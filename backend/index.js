require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('better-sqlite3');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const path = require('path');
const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// SQLite Database Setup
const db = sqlite3('contacts.db');

// Create contacts table
db.prepare(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    phoneNumber TEXT,
    businessName TEXT,
    inquiryType TEXT,
    message TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// OAuth2 Configuration
const oAuth2Client = new google.auth.OAuth2(
  config.oauthClientId,
  config.oauthClientSecret,
  config.oauthRedirectUri
);
oAuth2Client.setCredentials({ refresh_token: config.oauthRefreshToken });

// Email Transporter
async function createTransporter() {
  const accessToken = await oAuth2Client.getAccessToken();
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'info@admotionsa.com',
      clientId: config.oauthClientId,
      clientSecret: config.oauthClientSecret,
      refreshToken: config.oauthRefreshToken,
      accessToken: accessToken.token,
    },
  });
}

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, businessName, inquiryType, message } = req.body;

  try {
    // Save to SQLite
    const stmt = db.prepare(`
      INSERT INTO contacts 
      (firstName, lastName, email, phoneNumber, businessName, inquiryType, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(firstName, lastName, email, phoneNumber, businessName, inquiryType, message);

    // Send emails
    const transporter = await createTransporter();

    // User confirmation email
    const userMailOptions = {
      from: 'info@admotionsa.com',
      to: email,
      subject: 'Welcome to AdMotion',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; text-align: center;">
          <h1><strong>Dear ${firstName},</strong></h1>
          <p>Welcome to AdMotion! We are thrilled to have you with us. Thank you for reaching out.</p>
          <p>We've received your message and will respond shortly.</p>
          <p><strong><em>Where your brand is everywhere and seen by all.</em></strong></p>
          <p><em>Best regards,<br/>The AdMotion Team</em></p>
          <img src="cid:admotionLogo" alt="AdMotion Logo" style="max-width: 300px; margin: 20px 0;">
          <p style="font-size: 12px; color: grey; margin-top: 10px;">
            This is an automated response. Please do not reply to this email.
          </p>
        </div>
      `,
      attachments: [{
        filename: 'AdMotion.png',
        path: path.join(__dirname, 'images/AdMotion.png'),
        cid: 'admotionLogo'
      }]
    };

    // Company notification email
    const companyMailOptions = {
      from: 'info@admotionsa.com',
      to: config.companyEmail,
      subject: 'New Contact Form Submission',
      text: `New submission:\n
        Name: ${firstName} ${lastName}
        Email: ${email}
        Phone: ${phoneNumber}
        Business: ${businessName}
        Inquiry: ${inquiryType}
        Message: ${message}`
    };

    // Send both emails
    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(companyMailOptions);

    res.send('Message received and emails sent');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
});

// Start Server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});