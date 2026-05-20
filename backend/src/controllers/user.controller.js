const asyncHandler = require('express-async-handler');
const User = require('../models/User');

exports.list = asyncHandler(async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

exports.get = asyncHandler(async (req, res) => {
  const u = await User.findById(req.params.id);
  if (!u) { res.status(404); throw new Error('User not found'); }
  res.json(u);
});

exports.create = asyncHandler(async (req, res) => {
  const { name, email, username, password, role, centre } = req.body;
  if (!name || !email || !username || !password) {
    res.status(400);
    throw new Error('Name, email, username and password are required.');
  }
  if (password.length < 6) { res.status(400); throw new Error('Password must be at least 6 characters.'); }

  const dupe = await User.findOne({ $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] });
  if (dupe) { res.status(409); throw new Error('Email or username already in use.'); }

  const user = await User.create({
    name, email: email.toLowerCase(), username: username.toLowerCase(), password,
    role: role || 'Receptionist', centre: centre || 'CTR001',
  });
  res.status(201).json(user);
});

exports.update = asyncHandler(async (req, res) => {
  const u = await User.findById(req.params.id);
  if (!u) { res.status(404); throw new Error('User not found'); }
  const { name, email, username, role, centre, status, password } = req.body;
  if (name)     u.name = name;
  if (email)    u.email = email.toLowerCase();
  if (username) u.username = username.toLowerCase();
  if (role)     u.role = role;
  if (centre)   u.centre = centre;
  if (status)   u.status = status;
  if (password) u.password = password;
  await u.save();
  res.json(u);
});

exports.remove = asyncHandler(async (req, res) => {
  const u = await User.findByIdAndDelete(req.params.id);
  if (!u) { res.status(404); throw new Error('User not found'); }
  res.json({ ok: true });
});
