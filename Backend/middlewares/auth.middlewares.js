const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(parts[1], process.env.JWT_SECRET, { algorithms: ['HS256'] });
    console.log('Payload từ token:', payload); // Xem payload chứa gì
    req.user = payload; // { sub, role, iat, exp }
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

exports.checkRole = (requiredRole) => (req, res, next) => {
  if (!req.user || req.user.role !== requiredRole) {
    return res.status(403).json({ success: false, message: `Access denied: requires ${requiredRole}` });
  }
  next();
};

exports.authRequired = (req, res, next) => {
  const raw = req.headers.authorization || '';
  const token = raw.startsWith('Bearer ') ? raw.slice(7) : null;
  if (!token) return res.status(401).json({ success:false, message:'Unauthorized' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // payload: { sub: <ownerId>, role: <role>, iat, exp }
    req.user = { id: payload.sub, role: payload.role };
    return next();
  } catch (e) {
    return res.status(401).json({ success:false, message:'Invalid token' });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success:false, message:'Forbidden' });
  }
  next();
};
