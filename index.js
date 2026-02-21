const { Client } = require('pg');
const config = require('./config/config');


const client = new Client({
  host: config.db.host,
  port: config.db.port,
  database: config.db.name,
  user: config.db.user,
  password: config.db.password,
});
const getUsers = async () => {
  try {
    const result = await client.query('SELECT * FROM users');
    console.log('Users:', result.rows);
  } catch (err) {
    console.error('Error fetching users:', err.message);
  }
};
const createUser = async (name, email) => {
  try {
    const result = await client.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );

    console.log('User created:', result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err.message);
  }
};

client.connect()
  .then(async () => {
    console.log(`Connected using ${config.env} environment`);
    await createUser('John Doe', 'john@example.com');
    await getUsers();
    await client.end();
  })
  .catch((err) => {
    console.error(`Failed to connect using ${config.env} environment`);
    console.error(err.message);
  });