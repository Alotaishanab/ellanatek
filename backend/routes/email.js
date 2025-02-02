// /routes/email.js
const express = require('express');
const router = express.Router();
const createTransporter = require('../config/transporter');
const {
  generateEmailTemplate,
  generateProposalTemplate,
  generateEmailClientsTemplate
} = require('../utils/emailTemplates');
const db = require('../config/db');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/send-email', authenticateToken, async (req, res) => {
  const { clientIds, emails, subject, customMessage, isProposal, isClientEmail } = req.body;

  if ((!clientIds || clientIds.length === 0) && (!emails || emails.length === 0)) {
    return res.status(400).json({ message: 'At least one clientId or email is required' });
  }

  try {
    const transporter = await createTransporter();
    let recipientEmails = [];

    if (clientIds && clientIds.length > 0) {
      const placeholders = clientIds.map(() => '?').join(',');
      const query = `SELECT email, firstName FROM contacts WHERE id IN (${placeholders}) AND isUnsubscribed = 0`;
      const clients = db.prepare(query).all(...clientIds);
      if (clients.length === 0) {
        return res.status(404).json({ message: 'No valid clients found or all unsubscribed' });
      }
      clients.forEach(c => recipientEmails.push({ email: c.email, firstName: c.firstName }));
    }

    if (emails && emails.length > 0) {
      emails.forEach(email => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
          recipientEmails.push({ email, firstName: '' });
        }
      });
    }

    if (recipientEmails.length === 0) {
      return res.status(400).json({ message: 'No valid email addresses provided' });
    }

    // Remove duplicate emails (case-insensitive)
    recipientEmails = recipientEmails.filter(
      (item, index, self) =>
        index === self.findIndex(t => t.email.toLowerCase() === item.email.toLowerCase())
    );

    const sendPromises = recipientEmails.map(async (r) => {
      let htmlContent;
      let finalSubject = subject; // subject provided by the admin

      if (isProposal) {
        // Use the recipient's first name (or a default) for proposals.
        const nameToUse = r.firstName || 'Partner';
        htmlContent = generateProposalTemplate(nameToUse);
        finalSubject = subject || 'AdMotion Proposal';
      } else if (isClientEmail) {
        const nameToUse = r.firstName || 'Valued Client';
        htmlContent = generateEmailClientsTemplate(nameToUse);
      } else {
        htmlContent = generateEmailTemplate({
          title: subject || 'AdMotion Update',
          message: customMessage || 'We have an update for you!',
        });
        finalSubject = subject || 'AdMotion Update';
      }

      const mailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: r.email,
        subject: finalSubject,
        html: htmlContent,
      };

      // Log the mail options for debugging
      console.log(`Sending email to ${r.email} with subject "${finalSubject}"`);
      console.log('Mail Options:', mailOptions);

      // Send the email and log the response
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info);
    });

    await Promise.all(sendPromises);
    res.send('Emails sent successfully');
  } catch (err) {
    console.error('Error sending emails:', err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
