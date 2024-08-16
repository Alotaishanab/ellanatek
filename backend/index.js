require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const axios = require('axios'); // Import axios
const path = require('path');

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

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error with transporter:', error);
  } else {
    console.log('Transporter is ready');
  }
});

// Handle contact form submission
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, businessName, inquiryType, message, recaptchaValue } = req.body;
  console.log('Received request:', req.body);

  // Verify reCAPTCHA
  try {
    const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY; // Use your secret key
    const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: recaptchaSecretKey,
        response: recaptchaValue,
      },
    });

    const { success, score } = recaptchaResponse.data;
    
    if (!success || score < 0.5) {
      // reCAPTCHA failed
      return res.status(400).json({ message: 'reCAPTCHA verification failed' });
    }

    // If reCAPTCHA is successful, proceed with saving the contact and sending emails
    const newContact = new Contact({ firstName, lastName, email, phoneNumber, businessName, inquiryType, message });
    await newContact.save();
    console.log('Saved new contact to MongoDB');

    // Send email to the user (example)
    const userMailOptions = {
      from: process.env.EMAIL_USER,
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
      `
    };

    transporter.sendMail(userMailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email to user:', error);
        return res.status(500).send('Error sending email');
      }
      console.log('Email sent to user:', info.response);
    });

    // Send email to the company (example)
    const companyMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.COMPANY_EMAIL,
      subject: 'New Contact Form Submission',
      text: `New contact form submission received:\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nBusiness Name: ${businessName}\nInquiry Type: ${inquiryType}\nMessage: ${message}\n\nPlease follow up with this inquiry as soon as possible.`,
    };

    transporter.sendMail(companyMailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email to company:', error);
        return res.status(500).send('Error sending email');
      }
      console.log('Email sent to company:', info.response);
      res.send('Message received and emails sent');
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).send('Internal server error');
  }
});

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
