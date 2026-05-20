const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function signToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role, centre: user.centre },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

// POST /api/auth/login   { identifier, password }
//   identifier may be email or username
exports.login = asyncHandler(async (req, res) => {
  const { identifier, email, username, password } = req.body;
  const id = (identifier || email || username || '').trim();
  if (!id || !password) { res.status(400); throw new Error('Identifier and password are required.'); }

  const user = await User.findOne({
    $or: [{ email: id.toLowerCase() }, { username: id.toLowerCase() }],
  }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid credentials.');
  }
  if (user.status !== 'active') { res.status(403); throw new Error('User is inactive.'); }

  user.last = 'now';
  await user.save();

  const token = signToken(user);
  res.json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      centre: user.centre,
      initials: user.initials,
      status: user.status,
    },
  });
});

// GET /api/auth/me
exports.me = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// GET /api/auth/bootstrap-status   →  { needsBootstrap: true } when DB has no users
exports.bootstrapStatus = asyncHandler(async (_req, res) => {
  const count = await User.countDocuments();
  res.json({ needsBootstrap: count === 0, userCount: count });
});

// POST /api/auth/register   { name, email, username, password }
// Public — only succeeds while the DB has zero users (bootstrap mode).
// The created user is automatically Super Admin and is logged in.
exports.register = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  if (count > 0) {
    res.status(403);
    throw new Error('Registration is closed. Ask a Super Admin to create your account.');
  }
  const { name, email, username, password } = req.body;
  if (!name || !email || !username || !password) {
    res.status(400);
    throw new Error('Name, email, username and password are required.');
  }
  if (password.length < 6) { res.status(400); throw new Error('Password must be at least 6 characters.'); }

  const user = await User.create({
    name,
    email: String(email).toLowerCase(),
    username: String(username).toLowerCase(),
    password,
    role: 'Super Admin',
    centre: 'CTR001',
    status: 'active',
  });
  const token = signToken(user);
  res.status(201).json({
    token,
    user: {
      _id: user._id, name: user.name, email: user.email, username: user.username,
      role: user.role, centre: user.centre, initials: user.initials, status: user.status,
    },
  });
});
