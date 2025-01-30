// backend.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('better-sqlite3');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// SQLite Database Setup
const db = sqlite3('contacts.db');

// Create contacts table if it doesn't exist
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
    isUnsubscribed INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// Add 'isUnsubscribed' column if it doesn't exist
try {
  db.prepare(`
    ALTER TABLE contacts 
    ADD COLUMN isUnsubscribed INTEGER DEFAULT 0
  `).run();
} catch (err) {
  if (!err.message.includes('duplicate column name')) {
    throw err;
  }
}

// OAuth2 Configuration
const oAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });

// Email Transporter
async function createTransporter() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.COMPANY_EMAIL, // Using COMPANY_EMAIL as per your instruction
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });
  } catch (error) {
    console.error('Error creating transporter:', error);
    throw error;
  }
}

// JWT Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid access token' });
    }
    req.user = user;
    next();
  });
}

// Reusable Email Template Function with Inline Styles
function generateEmailTemplate({ title, message, footer }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>${title || 'AdMotion'}</title>
    </head>
    <body style="margin:0; padding:0; background-color:#000000;">
        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#000000; padding:20px 0;">
            <tr>
                <td align="center">
                    <!-- Email Content -->
                    <table width="720" cellpadding="0" cellspacing="0" border="0" style="background-color:#000000; border-radius:20px; overflow:hidden; font-family:'Montserrat', Arial, sans-serif;">
                        
                        <!-- Hero Section -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #2A0940 0%, #000000 100%); padding:40px 20px; text-align:center; position:relative;">
                                <div style="position: relative; z-index: 1;">
                                    <h1 style="font-family:'Space Grotesk', sans-serif; font-size:2.4em; letter-spacing:-0.03em; background: linear-gradient(90deg, #B56FDB 0%, #702B80 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom:15px;">${title || 'Welcome to AdMotion'}</h1>
                                    <p style="font-size:1.1em; color:#cccccc; margin-bottom:30px;">${message || 'We are excited to have you with us!'}</p>
                                    <a href="${footer.link || '#'}" style="
                                        display:inline-block;
                                        padding:16px 40px;
                                        background: linear-gradient(135deg, #702B80 0%, #4A1B55 100%);
                                        color:#fff;
                                        border-radius:50px;
                                        font-weight:700;
                                        text-transform:uppercase;
                                        letter-spacing:1px;
                                        text-decoration:none;
                                        border:2px solid rgba(181,111,219,0.3);
                                        transition: all 0.4s ease;
                                    ">${footer.buttonText || 'Get Started'}</a>
                                </div>
                                <!-- Pulsing Overlay -->
                                <div style="
                                    content:'';
                                    position:absolute;
                                    top:-50%;
                                    left:-50%;
                                    width:200%;
                                    height:200%;
                                    background: radial-gradient(circle, rgba(112,43,128,0.2) 0%, rgba(0,0,0,0) 70%);
                                    animation: pulse 8s infinite;
                                    z-index:0;
                                "></div>
                            </td>
                        </tr>
                        
                        <!-- Dynamic Content Block -->
                        <tr>
                            <td style="background: rgba(17,17,17,0.95); border:1px solid rgba(112,43,128,0.3); padding:30px; border-radius:20px; position:relative; backdrop-filter:blur(10px);">
                                <div style="position: relative; z-index:1;">
                                    <h2 style="
                                        font-size:1.6em;
                                        margin-bottom:20px;
                                        background: linear-gradient(90deg, #B56FDB 0%, #702B80 100%);
                                        -webkit-background-clip: text;
                                        -webkit-text-fill-color: transparent;
                                        padding-bottom:8px;
                                        border-bottom:2px solid rgba(112,43,128,0.3);
                                    ">${title || 'AdMotion Update'}</h2>
                                    <p style="font-size:1.1em; line-height:1.6; color:#ffffff; margin-bottom:20px;">${message || 'We have an update for you!'}</p>
                                    ${footer.additionalContent || ''}
                                </div>
                                <!-- Glowing Border Overlay -->
                                <div style="
                                    content:'';
                                    position:absolute;
                                    top:-2px;
                                    left:-2px;
                                    right:-2px;
                                    bottom:-2px;
                                    background: linear-gradient(45deg, #702B80, #4A1B55, #2A0940);
                                    border-radius:22px;
                                    animation:borderGlow 3s infinite;
                                    z-index:0;
                                "></div>
                            </td>
                        </tr>
                        
                        <!-- CTA Section -->
                        <tr>
                            <td style="background: linear-gradient(135deg, #2A0940 0%, #000 100%); padding:40px 20px; text-align:center; position:relative; border-radius:20px; margin:20px 0;">
                                <h2 style="
                                    font-size:2em;
                                    margin-bottom:20px;
                                    text-shadow:0 0 15px rgba(181,111,219,0.5);
                                    font-family:'Space Grotesk', sans-serif;
                                    color:#ffffff;
                                ">${footer.ctaTitle || 'Ready to Accelerate Your Growth?'}</h2>
                                <a href="${footer.ctaLink || '#'}" style="
                                    display:inline-block;
                                    padding:16px 40px;
                                    background: linear-gradient(135deg, #702B80 0%, #4A1B55 100%);
                                    color:#fff;
                                    border-radius:50px;
                                    font-weight:700;
                                    text-transform:uppercase;
                                    letter-spacing:1px;
                                    text-decoration:none;
                                    border:2px solid rgba(181,111,219,0.3);
                                    transition: all 0.4s ease;
                                ">${footer.ctaButtonText || 'Contact Now'}</a>
                            </td>
                        </tr>
                        
                        <!-- Footer Section -->
                        <tr>
                            <td style="background:#000; padding:30px 20px; text-align:center; font-family:'Poppins', sans-serif; font-size:0.9em; color:#cccccc; border-radius:0 0 20px 20px;">
                                <p>© 2025 AdMotion • All rights reserved</p>
                                <p>
                                    <a href="https://www.admotionsa.com" style="color:#B56FDB; text-decoration:none;">www.admotionsa.com</a><br>
                                    +966 XXXXXXXX • info@admotionsa.com
                                </p>
                            </td>
                        </tr>
                        
                    </table>
                </td>
            </tr>
        </table>
        
        <!-- Keyframes for Animations -->
        <style>
            @keyframes pulse {
                0% { transform: translate(0,0) scale(1); }
                50% { transform: translate(50px,50px) scale(1.2); }
                100% { transform: translate(0,0) scale(1); }
            }
            @keyframes borderGlow {
                0% { opacity: 0.8; }
                50% { opacity: 0.3; }
                100% { opacity: 0.8; }
            }
        </style>
    </body>
    </html>
  `;
}

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check if username matches
  if (username !== process.env.ADMIN_USERNAME) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Compare password with hash
  try {
    const match = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { username: process.env.ADMIN_USERNAME },
      process.env.JWT_SECRET,
      { expiresIn: '8h' } // Token validity
    );

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Contact Form Endpoint (Public)
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

    // User confirmation email using the new template
    const userMailOptions = {
      from: process.env.COMPANY_EMAIL,
      to: email,
      subject: 'Welcome to AdMotion',
      html: generateEmailTemplate({
        title: `Welcome, ${firstName}!`,
        message: "Thank you for reaching out to AdMotion. We've received your message and will respond shortly.",
        footer: {
          link: 'https://www.admotionsa.com',
          buttonText: 'Visit Our Website',
        },
      }),
    };

    // Company notification email using a simplified version of the template
    const companyMailOptions = {
      from: process.env.COMPANY_EMAIL,
      to: process.env.COMPANY_EMAIL,
      subject: 'New Contact Form Submission',
      html: generateEmailTemplate({
        title: 'New Contact Submission',
        message: `You have received a new contact form submission from <strong>${firstName} ${lastName}</strong>.`,
        footer: {
          link: '#', // No button needed, but keeping structure
          buttonText: '',
          additionalContent: `
            <div style="
              background: rgba(17,17,17,0.95);
              border:1px solid rgba(112,43,128,0.3);
              margin:20px 0;
              border-radius:20px;
              padding:30px;
              position:relative;
              backdrop-filter:blur(10px);
            ">
              <p style="font-size:1.1em; line-height:1.6; color:#ffffff; margin-bottom:20px;">
                <strong>Email:</strong> ${email}<br>
                <strong>Phone:</strong> ${phoneNumber}<br>
                <strong>Business:</strong> ${businessName}<br>
                <strong>Inquiry Type:</strong> ${inquiryType === 'general' ? 'General Inquiry' : 'Ad Inquiry'}<br>
                <strong>Message:</strong> ${message}
              </p>
            </div>
          `,
        },
      }),
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

// Protected Routes
const protectedRoutes = express.Router();
protectedRoutes.use(authenticateToken);

// Endpoint to Get All Contacts with Filtering and Searching
protectedRoutes.get('/contacts', (req, res) => {
  try {
    const { inquiryType, businessName } = req.query;
    let query = 'SELECT * FROM contacts WHERE 1=1';
    const params = [];

    if (inquiryType) {
      query += ' AND inquiryType = ?';
      params.push(inquiryType);
    }

    if (businessName) {
      query += ' AND businessName LIKE ?';
      params.push(`%${businessName}%`);
    }

    query += ' ORDER BY createdAt DESC';

    const contacts = db.prepare(query).all(...params);
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).send('Internal server error');
  }
});

// Endpoint to Unsubscribe a Client
protectedRoutes.post('/unsubscribe', (req, res) => {
  const { clientId } = req.body;

  if (!clientId) {
    return res.status(400).json({ message: 'Client ID is required' });
  }

  try {
    const stmt = db.prepare('UPDATE contacts SET isUnsubscribed = 1 WHERE id = ?');
    const result = stmt.run(clientId);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ message: 'Client unsubscribed successfully' });
  } catch (error) {
    console.error('Error unsubscribing client:', error);
    res.status(500).send('Internal server error');
  }
});

// Endpoint to Send Emails to Multiple Recipients
protectedRoutes.post('/send-email', async (req, res) => {
  const { clientIds, emails, subject, customMessage } = req.body;

  // Validate input
  if ((!clientIds || clientIds.length === 0) && (!emails || emails.length === 0)) {
    return res.status(400).json({ message: 'At least one clientId or email is required' });
  }

  try {
    const transporter = await createTransporter();

    let recipientEmails = [];

    // Fetch emails from clientIds
    if (clientIds && clientIds.length > 0) {
      const placeholders = clientIds.map(() => '?').join(',');
      const query = `SELECT email, firstName FROM contacts WHERE id IN (${placeholders}) AND isUnsubscribed = 0`;
      const stmt = db.prepare(query);
      const clients = stmt.all(...clientIds);

      if (clients.length === 0) {
        return res.status(404).json({ message: 'No valid clients found or all are unsubscribed' });
      }

      // Add to recipientEmails
      clients.forEach(client => {
        recipientEmails.push({
          email: client.email,
          firstName: client.firstName,
        });
      });
    }

    // Add manual emails
    if (emails && emails.length > 0) {
      emails.forEach(email => {
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
          recipientEmails.push({
            email: email,
            firstName: '', // No first name for manual emails
          });
        }
      });
    }

    if (recipientEmails.length === 0) {
      return res.status(400).json({ message: 'No valid email addresses provided' });
    }

    // Remove duplicate emails
    recipientEmails = recipientEmails.filter((item, index, self) =>
      index === self.findIndex((t) => t.email.toLowerCase() === item.email.toLowerCase())
    );

    // Send emails sequentially or in parallel
    const sendEmailPromises = recipientEmails.map(async (recipient) => {
      const mailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: recipient.email,
        subject: subject || 'AdMotion Update',
        html: generateEmailTemplate({
          title: subject || 'AdMotion Update',
          message: customMessage || 'We have an update for you!',
          footer: {
            link: 'https://www.admotionsa.com',
            buttonText: 'Visit Our Website',
          },
        }),
      };

      await transporter.sendMail(mailOptions);
    });

    await Promise.all(sendEmailPromises);

    res.send('Emails sent successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send('Internal server error');
  }
});

// Use Protected Routes
app.use('/api', protectedRoutes);

// Start Server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
