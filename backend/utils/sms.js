// backend/utils/sms.js
//
//  Minimal wrapper around any HTTP-based SMS gateway.
//
//  ENV REQUIRED
//  ------------
//    SMS_API_URL   – endpoint to POST the SMS request
//    SMS_API_KEY   – your API key or token
//    SMS_SENDER_ID – optional sender ID if your provider requires one
//
//  The function resolves when the HTTP call completes.
//  Throwing an error will bubble to the caller so routes can
//  return a 500 if the SMS cannot be sent.
//

const axios = require('axios');

module.exports = async function sendSMS(phone, text) {
  if (!process.env.SMS_API_URL || !process.env.SMS_API_KEY) {
    throw new Error('SMS provider ENV keys missing');
  }

  await axios.post(process.env.SMS_API_URL, {
    to: phone,
    body: text,
    sender_id: process.env.SMS_SENDER_ID || 'ELLANATEK',
    api_key: process.env.SMS_API_KEY
  });
};
