const jwt = require('jsonwebtoken');
const env = require('../config/env');

const signAccessToken = (userId) =>
  jwt.sign({ id: userId }, env.jwtAccessSecret, { expiresIn: '1h' });

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  address: user.address,
  profileImage: user.profileImage,
});

const sendAuthResponse = (res, user, statusCode, message) => {
  const token = signAccessToken(user._id);

  res.cookie('accessToken', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.nodeEnv === 'production',
    maxAge: 60 * 60 * 1000,
  });

  res.status(statusCode).json({
    success: true,
    message,
    data: { user: sanitizeUser(user), token },
  });
};

module.exports = { signAccessToken, sanitizeUser, sendAuthResponse };
