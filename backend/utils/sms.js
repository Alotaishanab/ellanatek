// backend/utils/sms.js

// Minimal wrapper around WhatsApp Cloud API (mocked for now)
// Returns immediately, does NOT send a real SMS / WhatsApp message.
// Always succeeds with static code 123456.

module.exports = async function sendSMS(phone, text) {
  console.log(`Mock sendSMS called for ${phone} with text: ${text}`);

  // Instead of sending actual SMS/WhatsApp message,
  // just resolve successfully.
  return Promise.resolve();

  /*
  // Uncomment this block when ready to integrate WhatsApp Cloud API

  const axios = require('axios');

  if (!process.env.WA_PHONE_ID || !process.env.WA_TOKEN || !process.env.WA_TEMPLATE_NS) {
    throw new Error('WhatsApp Cloud API ENV keys missing');
  }

  await axios.post(`https://graph.facebook.com/v16.0/${process.env.WA_PHONE_ID}/messages`, {
    messaging_product: 'whatsapp',
    to: phone,
    type: 'template',
    template: {
      name: 'your_template_name_here',
      namespace: process.env.WA_TEMPLATE_NS,
      language: { code: 'en_US' },
      components: [
        {
          type: 'body',
          parameters: [{ type: 'text', text: '123456' }] // static code for now
        }
      ]
    }
  }, {
    headers: {
      Authorization: `Bearer ${process.env.WA_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  */
};
