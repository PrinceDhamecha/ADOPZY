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

  // Updated for Aiven: explicitly allow auto-negotiating the handshake
  ssl: {
    rejectUnauthorized: false,
  },

  // Set to 35 seconds to guarantee Render has enough time to complete the TLS handshake with Aiven
  connectTimeout: 35000,
});

module.exports = pool;
