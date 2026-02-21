const path = require('path');
const dotenv = require('dotenv');
const { Client } = require('pg');


const env = process.env.NODE_ENV || 'dev';
const envFile = `.env.${env}`;
dotenv.config({
  path: path.resolve(__dirname, envFile),
});

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

client.connect()
  .then(() => {
    console.log(`Connected using ${env} environment`);
  })
  .catch((err) => {
    console.error(`Failed to connect using ${env} environment`);
    console.error(err.message);
  });