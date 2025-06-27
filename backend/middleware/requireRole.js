// backend/middleware/requireRole.js
//
//  Usage examples:
//    router.get('/admin/panel', auth, requireRole('admin','superAdmin'), …)
//    router.patch('/ads/:id/approve', auth, requireRole('admin'), …)
//
//  If the authenticated user’s role is not in the
//  allowed list, we return HTTP 403.
//
//  No ENV keys required.
//

module.exports = (...roles) => (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthenticated' });
  
    return roles.includes(req.user.role)
      ? next()
      : res.status(403).json({ error: 'Forbidden – insufficient role' });
  };
  