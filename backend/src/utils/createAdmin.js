// One-shot script: create the first Super Admin so the empty DB has someone to log in with.
//   node src/utils/createAdmin.js  (uses env defaults)
//   ADMIN_EMAIL=foo@bar ADMIN_USERNAME=foo ADMIN_PASSWORD=secret node src/utils/createAdmin.js
require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');

(async () => {
  await connectDB();

  const email    = process.env.ADMIN_EMAIL    || 'admin@labsync.in';
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const name     = process.env.ADMIN_NAME     || 'LabSync Admin';

  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    console.log(`Admin already exists: ${existing.email} / ${existing.username}`);
    process.exit(0);
  }

  const u = await User.create({
    name, email, username, password,
    role: 'Super Admin', centre: 'CTR001', status: 'active',
  });
  console.log(`Created Super Admin → email: ${u.email} · username: ${u.username} · password: ${password}`);
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
