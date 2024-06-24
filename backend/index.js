const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mycompany', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const contactSchema = new mongoose.Schema({
  name: String,
  companyname: String,
  email: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'info@ellanatek.com', // your Gmail account
    pass: 'Foodjet4248@', // your Gmail password
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error with transporter:', error);
  } else {
    console.log('Transporter is ready');
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, companyname, email, message } = req.body;
  console.log('Received request:', req.body);

  try {
    const newContact = new Contact({ name, companyname, email, message });
    await newContact.save();
    console.log('Saved new contact to MongoDB');

    // Define the image paths
    const logoPath = '/Users/School/ellanatek/backend/images/logo.JPG';
    const instagramLogoPath = '/Users/School/ellanatek/backend/images/Instagram.JPG';
    const linkedinLogoPath = '/Users/School/ellanatek/backend/images/LinkedIn.JPG';
    const tiktokLogoPath = '/Users/School/ellanatek/backend/images/Tiktok.JPG';

    // Check if all image files exist
    const files = [logoPath, instagramLogoPath, linkedinLogoPath, tiktokLogoPath];
    let missingFiles = [];

    files.forEach(file => {
      if (!fs.existsSync(file)) {
        missingFiles.push(file);
      }
    });

    if (missingFiles.length > 0) {
      console.error('One or more logo files not found:', missingFiles);
      return res.status(500).send(`One or more logo files not found: ${missingFiles.join(', ')}`);
    }

    // Send email to the user
    const userMailOptions = {
      from: 'info@ellanatek.com',
      to: email,
      subject: 'Welcome to Ellanatek',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; text-align: center;">
          <h1><strong>Dear ${name},</strong></h1>
          <p>Welcome to Ellanatek! We are thrilled to have you with us. Thank you for reaching out to us.</p>
          <p>We have received your message and appreciate your interest in our mobile advertising solutions. Our team will review your inquiry and get back to you shortly.</p>
          <p><strong><em>Where your brand is everywhere and seen by all.</em></strong></p>
          <p><em>Best regards,<br/>The Ellanatek Team</em></p>
          <br/>
          <img src="cid:logo@ellanatek.com" alt="Ellanatek Logo" style="width: 300px; height: auto; display: block; margin: 0 auto;"/>
          <p style="font-size: 12px; color: grey; text-align: center; margin-top: 10px;">
            This is an automated response. Please do not reply to this email.
          </p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://instagram.com/ellanatek"><img src="cid:instagramLogo@ellanatek.com" alt="Instagram" style="width: 40px; height: 40px; margin: 0 10px;"/></a>
            <a href="https://www.linkedin.com/company/ellanatek/about/"><img src="cid:linkedinLogo@ellanatek.com" alt="LinkedIn" style="width: 40px; height: 40px; margin: 0 10px;"/></a>
            <a href="https://tiktok.com/@yourprofile"><img src="cid:tiktokLogo@ellanatek.com" alt="TikTok" style="width: 40px; height: 40px; margin: 0 10px;"/></a>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'logo.JPG',
          path: logoPath,
          cid: 'logo@ellanatek.com' // same cid value as in the html img src
        },
        {
          filename: 'Instagram.JPG',
          path: instagramLogoPath,
          cid: 'instagramLogo@ellanatek.com' // same cid value as in the html img src
        },
        {
          filename: 'LinkedIn.JPG',
          path: linkedinLogoPath,
          cid: 'linkedinLogo@ellanatek.com' // same cid value as in the html img src
        },
        {
          filename: 'Tiktok.JPG',
          path: tiktokLogoPath,
          cid: 'tiktokLogo@ellanatek.com' // same cid value as in the html img src
        }
      ]
    };

    transporter.sendMail(userMailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email to user:', error);
        return res.status(500).send('Error sending email');
      }
      console.log('Email sent to user:', info.response);
    });

    // Send email to the company
    const companyMailOptions = {
      from: 'info@ellanatek.com',
      to: 'info@ellanatek.com', // your company's email
      subject: 'New Contact Form Submission',
      text: `New contact form submission received:\n\nName: ${name}\nCompany: ${companyname}\nEmail: ${email}\nMessage: ${message}\n\nPlease follow up with this inquiry as soon as possible.`,
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
