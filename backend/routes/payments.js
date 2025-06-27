/**
 * @swagger
 * tags: [Payments]
 */

const express    = require('express');
const bodyParser = require('body-parser');
const stripe     = require('../config/stripe');
const { Payment, Booking } = require('../models');
const auth       = require('../middleware/authenticateToken');
const requirePhone = require('../middleware/requireVerifiedPhone');

const router = express.Router();

function pubKey () {
  return process.env.NODE_ENV === 'production'
    ? process.env.STRIPE_LIVE_PUBLISHABLE_KEY
    : process.env.STRIPE_PUBLISHABLE_KEY;
}

/**
 * @swagger
 * /api/payments/create-intent:
 *   post:
 *     summary: Create Stripe PaymentIntent
 *     tags: [Payments]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amountCents]
 *             properties:
 *               amountCents: { type: integer, example: 500 }
 *               currency:    { type: string, example: usd }
 *               bookingId:   { type: integer }
 *     responses:
 *       200:
 *         description: Client secret + publishable key
 */
router.post('/payments/create-intent',
  auth,
  requirePhone,
  async (req, res) => {
    const { amountCents, currency='usd', bookingId } = req.body;
    if (!amountCents || amountCents < 100)
      return res.status(400).json({ error: 'Invalid amount' });

    const intent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency,
      metadata: {
        userId: req.user.id.toString(),
        bookingId: bookingId || ''
      }
    });

    await Payment.create({
      amount: amountCents,
      currency,
      intentId: intent.id,
      status: intent.status,
      userId: req.user.id,
      bookingId
    });

    res.json({
      clientSecret: intent.client_secret,
      publishableKey: pubKey()
    });
  });

/**
 * @swagger
 * /webhooks/stripe:
 *   post:
 *     summary: Stripe webhook endpoint
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: string, description: Raw Stripe payload }
 *     responses: { 200: { description: ok } }
 */
router.post('/webhooks/stripe',
  bodyParser.raw({ type:'application/json' }),
  async (req, res) => {
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers['stripe-signature'],
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Stripe signature error:', err.message);
      return res.sendStatus(400);
    }

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object;
      await Payment.update({ status:'succeeded' }, { where:{ intentId:intent.id } });
      if (intent.metadata.bookingId) {
        await Booking.update({ paid:true }, { where:{ id:intent.metadata.bookingId } });
      }
    } else if (event.type === 'payment_intent.payment_failed') {
      const intent = event.data.object;
      await Payment.update({ status:'failed' }, { where:{ intentId:intent.id } });
    }
    res.json({ received:true });
  });

module.exports = router;
