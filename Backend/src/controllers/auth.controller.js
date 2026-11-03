const User = require('../models/user.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { missingFields } = require('../utils/validators');
const { sendAuthResponse, sanitizeUser } = require('../services/auth.service');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateCredentials = (body, requireName) => {
  const fields = requireName ? ['name', 'email', 'password'] : ['email', 'password'];
  const missing = missingFields(body, fields);
  if (missing.length) {
    throw new ApiError(400, `Missing required fields: ${missing.join(', ')}`);
  }
  if (!EMAIL_RE.test(body.email)) throw new ApiError(400, 'Invalid email format');
  if (requireName && (typeof body.password !== 'string' || body.password.length < 6)) {
    throw new ApiError(400, 'Password must be at least 6 characters');
  }
};

const register = asyncHandler(async (req, res) => {
  validateCredentials(req.body, true);

  const email = req.body.email.toLowerCase().trim();
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, 'Email is already registered');

  const user = await User.create({
    name: req.body.name.trim(),
    email,
    password: req.body.password,
    role: 'customer',
    profileImage: req.body.profileImage || '',
  });

  sendAuthResponse(res, user, 201, 'Registration successful');
});

const login = asyncHandler(async (req, res) => {
  validateCredentials(req.body);

  const email = req.body.email.toLowerCase().trim();
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(req.body.password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  sendAuthResponse(res, user, 200, 'Login successful');
});

const adminLogin = asyncHandler(async (req, res) => {
  validateCredentials(req.body);

  const email = req.body.email.toLowerCase().trim();
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(req.body.password))) {
    throw new ApiError(401, 'Invalid email or password');
  }
  if (user.role !== 'admin') {
    throw new ApiError(403, 'This account does not have admin access');
  }

  sendAuthResponse(res, user, 200, 'Admin login successful');
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie('accessToken');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Profile retrieved successfully',
    data: sanitizeUser(req.user),
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  const fields = ['name', 'phone', 'address', 'profileImage'];
  for (const field of fields) {
    if (req.body[field] !== undefined) user[field] = req.body[field];
  }
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: sanitizeUser(user),
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const missing = missingFields(req.body, ['currentPassword', 'newPassword']);
  if (missing.length) {
    throw new ApiError(400, `Missing required fields: ${missing.join(', ')}`);
  }
  if (typeof req.body.newPassword !== 'string' || req.body.newPassword.length < 6) {
    throw new ApiError(400, 'New password must be at least 6 characters');
  }

  const user = await User.findById(req.user._id).select('+password');
  if (!(await user.comparePassword(req.body.currentPassword))) {
    throw new ApiError(401, 'Current password is incorrect');
  }

  user.password = req.body.newPassword;
  await user.save();

  sendAuthResponse(res, user, 200, 'Password changed successfully');
});

module.exports = {
  register,
  login,
  adminLogin,
  logout,
  getProfile,
  updateProfile,
  changePassword,
};
