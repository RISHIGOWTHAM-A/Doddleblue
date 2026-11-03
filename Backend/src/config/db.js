const dns = require('dns');
const mongoose = require('mongoose');
const env = require('./env');

const connect = () =>
  mongoose.connect(env.mongodbUri, { dbName: 'royal_sweets' });

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  let conn;
  try {
    conn = await connect();
  } catch (err) {
    const dnsFailure = /querySrv|ECONNREFUSED|ENOTFOUND|ETIMEOUT|EAI_AGAIN/i.test(
      err.message
    );
    if (!dnsFailure || !env.mongodbUri.startsWith('mongodb+srv://')) throw err;

    dns.setServers(['8.8.8.8', '1.1.1.1']);
    conn = await connect();
  }

  console.log(
    `MongoDB connected: ${conn.connection.host}/${conn.connection.name}`
  );
};

module.exports = connectDB;
