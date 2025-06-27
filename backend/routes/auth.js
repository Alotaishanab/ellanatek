/**
 * @swagger
 * tags: [Auth]
 */

const express  = require('express');
const bcrypt   = require('bcrypt');
const jwt      = require('jsonwebtoken');
const { User, PhoneToken } = require('../models');
const sendSMS  = require('../utils/sms');
const mailer   = require('../config/transporter');
const templates= require('../utils/emailTemplates');
const auth     = require('../middleware/authenticateToken');
const router   = express.Router();

/* helper – sign JWT */
function sign(user) {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

/* helper – send SMS verification code */
async function sendCode(user) {
  await PhoneToken.destroy({ where: { userId: user.id, used: false } });
  const code = (Math.floor(100000 + Math.random() * 900000)).toString();
  await PhoneToken.create({
    userId:    user.id,
    code,
    expiresAt: new Date(Date.now() + 10 * 60_000)
  });
  await sendSMS(user.phone, `Ellanatek verification code: ${code}`);
}

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create advertiser account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, phone]
 *             properties:
 *               email:    { type: string, example: test@foo.com }
 *               password: { type: string, example: Pa$$w0rd }
 *               phone:    { type: string, example: "+966512345678" }
 *     responses:
 *       200:
 *         description: JWT returned
 */
router.post('/auth/signup', async (req, res) => {
  const { email, password, phone } = req.body;
  if (!email || !password || !phone)
    return res.status(400).json({ error: 'Missing fields' });

  const user = await User.create({
    email,
    passwordHash: await bcrypt.hash(password, 10),
    phone,
    phoneVerified: false,
    verified: false,
    role: 'advertiser'
  });

  await sendCode(user);

  /* welcome email */
  try {
    const t = await mailer();
    await t.sendMail({
      from: process.env.COMPANY_EMAIL,
      to: user.email,
      subject: 'Welcome to Ellanatek — verify your phone',
      html: templates.welcome(user.email)
    });
  } catch (e) {
    console.error('📧 Email send failed:', e.message);
  }

  res.json({ ok: true, token: sign(user) });
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and receive JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:    { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: JWT returned }
 */
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !await bcrypt.compare(password, user.passwordHash))
    return res.status(401).json({ error: 'Invalid credentials' });

  res.json({ ok: true, token: sign(user) });
});

/**
 * @swagger
 * /auth/send-code:
 *   post:
 *     summary: Resend phone verification code
 *     tags: [Auth]
 *     security: [ { bearerAuth: [] } ]
 *     responses: { 200: { description: Code sent } }
 */
router.post('/auth/send-code', auth, async (req, res) => {
  if (req.user.phoneVerified)
    return res.json({ ok: true, msg: 'Already verified' });

  await sendCode(req.user);
  res.json({ ok: true });
});

/**
 * @swagger
 * /auth/verify-code:
 *   post:
 *     summary: Verify SMS code
 *     tags: [Auth]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: { code: { type: string, example: "123456" } }
 *     responses:
 *       200: { description: Phone verified }
 */
router.post('/auth/verify-code', auth, async (req, res) => {
  const tok = await PhoneToken.findOne({
    where: {
      userId: req.user.id,
      code: req.body.code,
      used: false,
      expiresAt: { [require('sequelize').Op.gt]: new Date() }
    }
  });
  if (!tok) return res.status(400).json({ error: 'Invalid or expired code' });

  await tok.update({ used: true });
  await req.user.update({ phoneVerified: true });
  res.json({ ok: true });
});

module.exports = router;
