/**
 * @swagger
 * tags: [Auth]
 */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, PhoneToken } = require('../models');
const sendSMS = require('../utils/sms');
const mailer = require('../config/transporter');
const templates = require('../utils/emailTemplates');
const auth = require('../middleware/authenticateToken');
const { Op } = require('sequelize');  // <--- Import Op here
const router = express.Router();

/* helper – sign JWT */
function sign(user) {
  return jwt.sign(
    { 
      id: user.id, 
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

/* helper – send SMS verification code */
async function sendCode(user) {
  await PhoneToken.destroy({ where: { userId: user.id, used: false } });
  const code = (Math.floor(100000 + Math.random() * 900000)).toString();
  await PhoneToken.create({
    userId: user.id,
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
 *             required: [firstName, lastName, email, password, phone, termsAccepted, privacyAccepted]
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *                 minLength: 1
 *                 maxLength: 50
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *                 minLength: 1
 *                 maxLength: 50
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "test@foo.com"
 *               password:
 *                 type: string
 *                 example: "Pa$$w0rd"
 *                 minLength: 6
 *               phone:
 *                 type: string
 *                 example: "+966512345678"
 *                 description: "Phone number in E.164 format"
 *               termsAccepted:
 *                 type: boolean
 *                 example: true
 *                 description: "Must be true to create account"
 *               privacyAccepted:
 *                 type: boolean
 *                 example: true
 *                 description: "Must be true to create account"
 *     responses:
 *       200:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id: { type: integer }
 *                     firstName: { type: string }
 *                     lastName: { type: string }
 *                     email: { type: string }
 *                     phone: { type: string }
 *                     phoneVerified: { type: boolean }
 *                     termsAccepted: { type: boolean }
 *                     privacyAccepted: { type: boolean }
 *       400:
 *         description: Validation error or missing required fields
 *       409:
 *         description: Email or phone already exists
 */
router.post('/auth/signup', async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      phone, 
      termsAccepted, 
      privacyAccepted 
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !phone) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['firstName', 'lastName', 'email', 'password', 'phone']
      });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password must be at least 6 characters long' 
      });
    }

    // Validate agreements
    if (!termsAccepted) {
      return res.status(400).json({ 
        error: 'You must accept the Terms and Conditions to create an account' 
      });
    }

    if (!privacyAccepted) {
      return res.status(400).json({ 
        error: 'You must accept the Privacy Policy to create an account' 
      });
    }

    // Corrected Sequelize OR query
    const existingUser = await User.findOne({ 
      where: { 
        [Op.or]: [{ email }, { phone }] 
      } 
    });

    if (existingUser) {
      return res.status(409).json({ 
        error: existingUser.email === email ? 
          'An account with this email already exists' : 
          'An account with this phone number already exists'
      });
    }

    // Create user
    const now = new Date();
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      passwordHash: await bcrypt.hash(password, 12),
      phone: phone.trim(),
      phoneVerified: false,
      verified: false,
      role: 'advertiser',
      termsAccepted: true,
      privacyAccepted: true,
      termsAcceptedAt: now,
      privacyAcceptedAt: now
    });

    // Send verification code
    await sendCode(user);

    // Send welcome email
    try {
      const t = await mailer();
      await t.sendMail({
        from: process.env.COMPANY_EMAIL,
        to: user.email,
        subject: `Welcome to Ellanatek, ${user.firstName}!`,
        html: templates.welcome(user.firstName, user.email)
      });
    } catch (e) {
      console.error('📧 Email send failed:', e.message);
    }

    // Return success with token and user data
    res.status(200).json({ 
      ok: true, 
      token: sign(user),
      user: user.toJSON() // This excludes passwordHash
    });

  } catch (error) {
    console.error('Signup error:', error);
    
    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.errors.map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }

    // Handle unique constraint errors
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: 'Account already exists with this email or phone number'
      });
    }

    res.status(500).json({ 
      error: 'Internal server error during account creation'
    });
  }
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
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "test@foo.com"
 *               password:
 *                 type: string
 *                 example: "Pa$$w0rd"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: { type: boolean, example: true }
 *                 token: { type: string }
 *                 user: { type: object }
 *       401:
 *         description: Invalid credentials
 */
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    const user = await User.findOne({ 
      where: { email: email.toLowerCase().trim() } 
    });

    if (!user || !await bcrypt.compare(password, user.passwordHash)) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    res.json({ 
      ok: true, 
      token: sign(user),
      user: user.toJSON()
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Internal server error during login'
    });
  }
});

/**
 * @swagger
 * /auth/send-code:
 *   post:
 *     summary: Resend phone verification code
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Code sent successfully
 *       400:
 *         description: Phone already verified
 */
router.post('/auth/send-code', auth, async (req, res) => {
  try {
    if (req.user.phoneVerified) {
      return res.json({ 
        ok: true, 
        message: 'Phone number is already verified' 
      });
    }

    await sendCode(req.user);
    res.json({ 
      ok: true, 
      message: 'Verification code sent successfully' 
    });

  } catch (error) {
    console.error('Send code error:', error);
    res.status(500).json({ 
      error: 'Failed to send verification code'
    });
  }
});

/**
 * @swagger
 * /auth/verify-code:
 *   post:
 *     summary: Verify SMS code
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [code]
 *             properties:
 *               code:
 *                 type: string
 *                 example: "123456"
 *                 description: "6-digit verification code"
 *     responses:
 *       200:
 *         description: Phone verified successfully
 *       400:
 *         description: Invalid or expired code
 */
router.post('/auth/verify-code', auth, async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ 
        error: 'Verification code is required' 
      });
    }

    const tok = await PhoneToken.findOne({
      where: {
        userId: req.user.id,
        code: code.toString(),
        used: false,
        expiresAt: { [require('sequelize').Op.gt]: new Date() }
      }
    });

    if (!tok) {
      return res.status(400).json({ 
        error: 'Invalid or expired verification code' 
      });
    }

    // Mark token as used and verify phone
    await tok.update({ used: true });
    await req.user.update({ phoneVerified: true, verified: true });

    res.json({ 
      ok: true, 
      message: 'Phone number verified successfully',
      user: req.user.toJSON()
    });

  } catch (error) {
    console.error('Verify code error:', error);
    res.status(500).json({ 
      error: 'Failed to verify code'
    });
  }
});

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: User profile data
 */
router.get('/auth/profile', auth, async (req, res) => {
  try {
    res.json({ 
      ok: true, 
      user: req.user.toJSON() 
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch profile'
    });
  }
});

module.exports = router;
