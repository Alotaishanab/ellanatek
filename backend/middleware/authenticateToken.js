// backend/middleware/authenticateToken.js
//
//  Protects any route that requires a logged-in user.
//  Adds `req.user` (Sequelize model instance) to the request.
//
//  ENV REQUIRED
//  ------------
//    JWT_SECRET   – same key used when signing tokens
//
const jwt   = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token      = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) return res.status(401).json({ error: 'Token missing' });

  try {
    // 1) Verify signature
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2) Load user fresh from DB (so role/flags are always current)
    const user = await User.findByPk(decoded.id);
    if (!user) throw new Error('user not found');

    // 3) Attach to request
    req.user = user;
    next();
  } catch (err) {
    console.error('⚠️  JWT auth error:', err.message);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
