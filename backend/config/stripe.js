// backend/config/stripe.js
//
// Chooses the correct Stripe secret key based on NODE_ENV.
//  - development / test  ➜  STRIPE_SECRET_KEY   (sandbox)
//  - production          ➜  STRIPE_LIVE_SECRET_KEY
//
// Required ENV keys
// ------------------------------------------------------------------
//   STRIPE_SECRET_KEY          = sk_test_…   (sandbox secret)
//   STRIPE_PUBLISHABLE_KEY     = pk_test_…   (sandbox public)
//   STRIPE_LIVE_SECRET_KEY     = sk_live_…   (live secret)
//   STRIPE_LIVE_PUBLISHABLE_KEY= pk_live_…   (live public)
// ------------------------------------------------------------------

const Stripe = require('stripe');

const SECRET_KEY =
  process.env.NODE_ENV === 'production'
    ? process.env.STRIPE_LIVE_SECRET_KEY
    : process.env.STRIPE_SECRET_KEY;

if (!SECRET_KEY) {
  console.error('❌  Stripe secret key missing in environment');
  process.exit(1);
}

module.exports = Stripe(SECRET_KEY, { apiVersion: '2024-04-10' });
