const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 10582, // Your Aiven port
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  // Aiven requires SSL, but setting it to an empty object
  // tells mysql2 to auto-negotiate native TLS securely.
  ssl: {},

  // Higher timeout to account for cross-region routing to Aiven
  connectTimeout: 30000,
});

module.exports = pool;
