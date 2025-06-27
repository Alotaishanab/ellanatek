// backend/middleware/requireVerifiedPhone.js
//
//  Blocks advertisers that have not confirmed their phone number.
//  Admins/SuperAdmins bypass automatically.
//
//  Usage:
//    const verifyPhone = require('../middleware/requireVerifiedPhone');
//    router.post('/ads/upload', auth, verifyPhone, ...);
//
//  No ENV keys needed.
//
module.exports = (req, res, next) => {
    // If middleware is used before auth this will be undefined
    if (!req.user) return res.status(401).json({ error: 'Unauthenticated' });
  
    // Admin roles skip the check
    if (req.user.role === 'admin' || req.user.role === 'superAdmin') return next();
  
    // Advertiser must have verified phone
    if (req.user.phoneVerified) return next();
  
    return res.status(403).json({ error: 'Phone number not verified' });
  };
  