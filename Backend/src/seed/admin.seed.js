const mongoose = require('mongoose');
const connectDB = require('../config/db');
const env = require('../config/env');
const User = require('../models/user.model');

const seedAdmin = async () => {
  if (!env.admin.email || !env.admin.password) {
    console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
    process.exit(1);
  }

  await connectDB();
  const email = env.admin.email.toLowerCase().trim();

  const existing = await User.findOne({ email });
  if (existing) {
    if (existing.role !== 'admin') {
      existing.role = 'admin';
      await existing.save();
      console.log(`Promoted existing user to admin: ${email}`);
    } else {
      console.log(`Admin already exists: ${email}`);
    }
  } else {
    await User.create({
      name: 'Admin',
      email,
      password: env.admin.password,
      role: 'admin',
    });
    console.log(`Admin created: ${email}`);
  }

  await mongoose.disconnect();
  process.exit(0);
};

seedAdmin().catch((err) => {
  console.error(`Admin seed failed: ${err.message}`);
  process.exit(1);
});
