/**
 * @swagger
 * tags: [Contacts]
 *
 * /api/contacts:
 *   get:
 *     summary: List captured contact-us leads
 *     description: Admin-only endpoint that supports optional filtering.
 *     tags: [Contacts]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: query
 *         name: inquiryType
 *         schema: { type: string, example: "Partnership" }
 *       - in: query
 *         name: businessName
 *         schema: { type: string, example: "Acme Corp" }
 *     responses:
 *       200:
 *         description: Array of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:           { type: integer }
 *                   firstName:    { type: string }
 *                   lastName:     { type: string }
 *                   email:        { type: string }
 *                   phoneNumber:  { type: string }
 *                   businessName: { type: string }
 *                   inquiryType:  { type: string }
 *                   message:      { type: string }
 *                   createdAt:    { type: string, format: date-time }
 */

const express          = require('express');
const router           = express.Router();
const db               = require('../config/db');
const authenticateToken= require('../middleware/authenticateToken');
const requireRole      = require('../middleware/requireRole'); // ensure admin access

router.get('/contacts',
  authenticateToken,
  requireRole('admin','superAdmin'),
  (req, res) => {
    try {
      const { inquiryType, businessName } = req.query;

      let query   = 'SELECT * FROM contacts WHERE 1=1';
      const params= [];

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
    } catch (err) {
      console.error('contacts fetch error:', err);
      res.status(500).send('Internal server error');
    }
  });

module.exports = router;
