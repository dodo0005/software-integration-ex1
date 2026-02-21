const path = require('path');
const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'dev';
const envFile = `.env.${env}`;
dotenv.config({
  path: path.resolve(__dirname, `../${envFile}`),
});

// 4. Export useful config
module.exports = {
  env,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
};