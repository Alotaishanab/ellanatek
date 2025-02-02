// /routes/unsubscribe.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/unsubscribe', (req, res) => {
  const { clientId } = req.body;
  if (!clientId) {
    return res.status(400).json({ message: 'Client ID is required' });
  }

  try {
    const result = db.prepare('UPDATE contacts SET isUnsubscribed = 1 WHERE id = ?').run(clientId);
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json({ message: 'Client unsubscribed successfully' });
  } catch (error) {
    console.error('Error unsubscribing client:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
