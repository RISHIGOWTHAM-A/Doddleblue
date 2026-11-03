const dotenv = require('dotenv');

dotenv.config();

const required = ['MONGODB_URI', 'JWT_ACCESS_SECRET', 'CLIENT_URL'];
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(
    `Missing required environment variables: ${missing.join(', ')}. ` +
      'Copy .env.example to .env and fill in the values.'
  );
  process.exit(1);
}

module.exports = {
  port: Number(process.env.PORT) || 6000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodbUri: process.env.MONGODB_URI,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  clientUrl: process.env.CLIENT_URL,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  admin: {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
};
