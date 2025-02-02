// /routes/contact.js
const express = require('express');
const router = express.Router();
const createTransporter = require('../config/transporter');
const { generateEmailTemplate, generateContactMeEmailTemplate } = require('../utils/emailTemplates');
const db = require('../config/db');

router.post('/contact', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, businessName, inquiryType, message } = req.body;

  try {
    // Save the contact in the database
    db.prepare(`
      INSERT INTO contacts 
      (firstName, lastName, email, phoneNumber, businessName, inquiryType, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(firstName, lastName, email, phoneNumber, businessName, inquiryType, message);

    const transporter = await createTransporter();

    // Email sent to the user
    const userMailOptions = {
      from: process.env.COMPANY_EMAIL,
      to: email,
      subject: 'Welcome to AdMotion',
      html: generateEmailTemplate({
        title: `Welcome, ${firstName}!`,
        message: "Thank you for reaching out to AdMotion. We've received your message and will respond shortly.",
      }),
    };

    // Email sent to the company using the new "Contact Me" template
    const companyMailOptions = {
      from: process.env.COMPANY_EMAIL,
      to: process.env.COMPANY_EMAIL,
      subject: 'New Contact Form Submission',
      html: generateContactMeEmailTemplate({
        senderName: `${firstName} ${lastName}`,
        senderEmail: email,
        senderPhone: phoneNumber,
        message: `
          <strong>Business:</strong> ${businessName}<br>
          <strong>Inquiry Type:</strong> ${inquiryType}<br>
          <strong>Message:</strong> ${message}
        `,
      }),
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(companyMailOptions);

    res.send('Message received and emails sent');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
