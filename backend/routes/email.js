/**
 * @swagger
 * tags: [Emails]
 *
 * /api/send-email:
 *   post:
 *     summary: Send custom or template email to clients (admin only)
 *     tags: [Emails]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientIds:
 *                 type: array
 *                 items: { type: integer }
 *                 description: IDs from contacts table
 *               emails:
 *                 type: array
 *                 items: { type: string, format: email }
 *               subject:        { type: string }
 *               customMessage:  { type: string }
 *               isProposal:     { type: boolean, default: false }
 *               isClientEmail:  { type: boolean, default: false }
 *     responses:
 *       200: { description: Emails queued }
 */

const express = require('express');
const router  = express.Router();

const createTransporter = require('../config/transporter');
const {
  generateEmailTemplate,
  generateProposalTemplate,
  generateEmailClientsTemplate
} = require('../utils/emailTemplates');
const db                 = require('../config/db');
const authenticateToken  = require('../middleware/authenticateToken');
const requireRole        = require('../middleware/requireRole'); // make sure only admins call this

router.post('/send-email',
  authenticateToken,
  requireRole('admin', 'superAdmin'),
  async (req, res) => {
    const { clientIds, emails, subject,
            customMessage, isProposal, isClientEmail } = req.body;

    if ((!clientIds || !clientIds.length) && (!emails || !emails.length))
      return res.status(400).json({ message: 'clientIds or emails required' });

    try {
      const transporter = await createTransporter();
      let recipients = [];

      if (clientIds?.length) {
        const qs   = clientIds.map(() => '?').join(',');
        const rows = db.prepare(
          `SELECT email, firstName
             FROM contacts
            WHERE id IN (${qs}) AND isUnsubscribed = 0`
        ).all(...clientIds);
        rows.forEach(r => recipients.push({ email: r.email, firstName: r.firstName }));
      }
      if (emails?.length) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        emails.forEach(e => emailRegex.test(e) && recipients.push({ email: e, firstName: '' }));
      }
      // dedupe (case-insensitive)
      recipients = recipients.filter(
        (r,i,self) => i === self.findIndex(t => t.email.toLowerCase() === r.email.toLowerCase())
      );
      if (!recipients.length) return res.status(400).json({ message: 'No valid recipients' });

      await Promise.all(recipients.map(async r => {
        let html, finalSubject = subject;
        if (isProposal) {
          html = generateProposalTemplate(r.firstName || 'Partner');
          finalSubject ||= 'AdMotion Proposal';
        } else if (isClientEmail) {
          html = generateEmailClientsTemplate(r.firstName || 'Valued Client');
          finalSubject ||= 'AdMotion Update';
        } else {
          html = generateEmailTemplate({
            title:   subject || 'AdMotion Update',
            message: customMessage || 'We have an update for you!'
          });
          finalSubject ||= 'AdMotion Update';
        }
        await transporter.sendMail({
          from: process.env.COMPANY_EMAIL,
          to:   r.email,
          subject: finalSubject,
          html
        });
      }));

      res.json({ ok: true, sent: recipients.length });
    } catch (err) {
      console.error('send-email error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
