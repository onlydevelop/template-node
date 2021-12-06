const { Pool } = require('pg');
const fs = require('fs');

const createPool = () => {
  return new Pool({
    user: 'dipanjan',
    host: 'localhost',
    database: 'test',
    password: '',
  });
};

exports.clean = async () => {
  console.log('Cleaning the database...');

  // Create the pool
  const pool = createPool();

  // Read the table DROP/CREATE script
  const cleanDB = fs.readFileSync(`${__dirname}/clean.sql`, {
    encoding: 'utf-8',
  });

  // DROP/CREATE the database tables
  await pool.query(cleanDB);
  await pool.end();

  console.log('Done!');
};

exports.populate = async () => {
  // First clean the database
  await this.clean();

  console.log('Populating the database...');

  // Create the pool
  const pool = createPool();

  // Read the insert data queries
  const populateDB = fs.readFileSync(`${__dirname}/populate.sql`, {
    encoding: 'utf-8',
  });

  // DROP/CREATE the database tables
  await pool.query(populateDB);
  const res = await pool.query('SELECT * FROM items');
  // console.log(res.rows);
  await pool.end();

  console.log('Done!');
};
