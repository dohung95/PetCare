const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(parts[1], process.env.JWT_SECRET, { algorithms: ['HS256'] });
    req.user = payload; // { sub, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

exports.checkRole = (requiredRole) => (req, res, next) => {
  if (!req.user || req.user.role !== requiredRole) {
    return res.status(403).json({ success: false, message: `Access denied: requires ${requiredRole}` });
  }
  next();
};
