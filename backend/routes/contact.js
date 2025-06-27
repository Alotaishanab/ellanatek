/**
 * @swagger
 * tags: [Contact]
 *
 * /api/contact:
 *   post:
 *     summary: Public contact-us form
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, message]
 *             properties:
 *               firstName:    { type: string }
 *               lastName:     { type: string }
 *               email:        { type: string, format: email }
 *               phoneNumber:  { type: string }
 *               businessName: { type: string }
 *               inquiryType:  { type: string, example: Partnership }
 *               message:      { type: string }
 *     responses:
 *       200: { description: Stored & emails sent }
 */

const express = require('express');
const router  = express.Router();

const createTransporter = require('../config/transporter');
const db                 = require('../config/db');
const {
  generateContactMeUserTemplate,
  generateContactMeCompanyTemplate
} = require('../utils/emailTemplates');

router.post('/contact', async (req, res) => {
  const {
    firstName, lastName, email, phoneNumber,
    businessName, inquiryType, message
  } = req.body;

  try {
    /* 1️⃣ Save lead */
    db.prepare(`
      INSERT INTO contacts
        (firstName,lastName,email,phoneNumber,businessName,inquiryType,message)
      VALUES (?,?,?,?,?,?,?)
    `).run(firstName,lastName,email,phoneNumber,businessName,inquiryType,message);

    /* 2️⃣ Send reply + alert */
    const transporter   = await createTransporter();
    const userHTML      = generateContactMeUserTemplate();
    const companyHTML   = generateContactMeCompanyTemplate({
      senderName : `${firstName} ${lastName}`,
      senderEmail: email,
      senderPhone: phoneNumber,
      businessName, inquiryType, message
    });

    await Promise.all([
      transporter.sendMail({
        from:    process.env.COMPANY_EMAIL,
        to:      email,
        subject: 'Thank you for contacting AdMotion',
        html:    userHTML
      }),
      transporter.sendMail({
        from:    process.env.COMPANY_EMAIL,
        to:      process.env.COMPANY_EMAIL,
        subject: 'New Contact Form Submission',
        html:    companyHTML
      })
    ]);

    res.send('Message received and emails sent');
  } catch (err) {
    console.error('contact route error:', err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
