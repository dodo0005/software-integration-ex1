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
const getUsers = async () => {
  try {
    const result = await client.query('SELECT * FROM users');
    console.log('Users:', result.rows);
  } catch (err) {
    console.error('Error fetching users:', err.message);
  }
};

client.connect()
  .then(async () => {
    console.log(`Connected using ${env} environment`);
    await getUsers();
    await client.end();
  })
  .catch((err) => {
    console.error(`Failed to connect using ${env} environment`);
    console.error(err.message);
  });