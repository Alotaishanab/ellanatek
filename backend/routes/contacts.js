// /routes/contacts.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/contacts', authenticateToken, (req, res) => {
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

module.exports = router;
