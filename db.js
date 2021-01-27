const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.User || 'postgres',
  password: process.env.Password || 'Hrithik@143',
  host: process.env.Host || 'localhost',
  port: 5432,
  database: process.env.Database || 'perntodo',
});

module.exports = pool;
