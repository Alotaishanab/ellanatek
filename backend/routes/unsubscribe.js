/**
 * @swagger
 * tags: [Unsubscribe]
 *
 * /api/unsubscribe:
 *   post:
 *     summary: Mark a contact as unsubscribed
 *     description: Link is typically embedded in marketing emails; no auth required.
 *     tags: [Unsubscribe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [clientId]
 *             properties:
 *               clientId:
 *                 type: integer
 *                 example: 42
 *     responses:
 *       200: { description: Client unsubscribed }
 *       404: { description: Client not found }
 */

const express = require('express');
const router  = express.Router();
const db      = require('../config/db');

router.post('/unsubscribe', (req, res) => {
  const { clientId } = req.body;
  if (!clientId) return res.status(400).json({ message: 'Client ID is required' });

  try {
    const { changes } =
      db.prepare('UPDATE contacts SET isUnsubscribed = 1 WHERE id = ?').run(clientId);

    if (changes === 0) return res.status(404).json({ message: 'Client not found' });

    res.json({ message: 'Client unsubscribed successfully' });
  } catch (err) {
    console.error('unsubscribe error:', err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
