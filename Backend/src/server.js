const app = require('./app');
const connectDB = require('./config/db');
const env = require('./config/env');

const startServer = async () => {
  try {
    await connectDB();
    app.listen(env.port, () => {
      console.log(`Royal Sweets backend listening on port ${env.port}`);
    });
  } catch (err) {
    console.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  }
};

startServer();
