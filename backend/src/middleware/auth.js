const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) {
    console.warn(`[auth] ${req.method} ${req.originalUrl} → no Authorization header (got: "${auth || 'empty'}")`);
    res.status(401);
    throw new Error('Not authorized · no token');
  }
  if (!process.env.JWT_SECRET) {
    console.error('[auth] JWT_SECRET is not set in the environment. Add it to backend/.env and restart.');
    res.status(500);
    throw new Error('Server misconfigured: JWT_SECRET is missing.');
  }
  const token = auth.slice('Bearer '.length).trim();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) { res.status(401); throw new Error('User no longer exists'); }
    if (user.status !== 'active') { res.status(403); throw new Error('User is inactive'); }
    req.user = user;
    next();
  } catch (e) {
    console.warn(`[auth] ${req.method} ${req.originalUrl} → token rejected: ${e.message}`);
    res.status(401);
    throw new Error(e.message || 'Not authorized · invalid token');
  }
});

const allow = (...roles) => (req, _res, next) => {
  if (!req.user) return next(new Error('Not authorized'));
  if (roles.length === 0 || roles.includes(req.user.role)) return next();
  const err = new Error('Forbidden · insufficient role');
  err.statusCode = 403;
  next(err);
};

module.exports = { protect, allow };
