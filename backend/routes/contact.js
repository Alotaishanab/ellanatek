// /routes/contact.js

const express = require('express');
const router = express.Router();
const createTransporter = require('../config/transporter');
const db = require('../config/db');

// Import the templates
const {
  generateContactMeUserTemplate,
  generateContactMeCompanyTemplate
} = require('../utils/emailTemplates');

router.post('/contact', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, businessName, inquiryType, message } = req.body;

  try {
    // 1. Insert the contact record into the DB
    db.prepare(`
      INSERT INTO contacts 
      (firstName, lastName, email, phoneNumber, businessName, inquiryType, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      firstName, 
      lastName, 
      email, 
      phoneNumber, 
      businessName, 
      inquiryType, 
      message
    );

    // 2. Create your Nodemailer transporter
    const transporter = await createTransporter();

    // 3. Generate the HTML templates
    const userEmailHTML = generateContactMeUserTemplate();
    const companyEmailHTML = generateContactMeCompanyTemplate({
      senderName: `${firstName} ${lastName}`,
      senderEmail: email,
      senderPhone: phoneNumber,
      businessName,
      inquiryType,
      message,
    });

    // 4. Build a list of mail jobs (like in email.js)
    //    We'll send two emails: one to the user, one to the company.
    const mailJobs = [
      {
        to: email,
        subject: 'Thank you for contacting AdMotion',
        html: userEmailHTML,
      },
      {
        to: process.env.COMPANY_EMAIL,
        subject: 'New Contact Form Submission',
        html: companyEmailHTML,
      },
    ];

    // 5. Map over mailJobs, send each one, and log similarly to email.js
    const sendPromises = mailJobs.map(async (job) => {
      const mailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: job.to,
        subject: job.subject,
        html: job.html,
      };

      console.log(`Sending contact email to ${job.to} with subject "${job.subject}"`);
      console.log('Mail Options:', mailOptions);

      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info);
    });

    // 6. Wait for both emails to send
    await Promise.all(sendPromises);

    // 7. Send success response
    res.send('Message received and emails sent');
  } catch (error) {
    console.error('Error in /contact route:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
