const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

let sslConfig = {
  rejectUnauthorized: false,
};

// Safely try to read the ca.pem file to ensure it exists on Render
try {
  const certPath = path.join(__dirname, "ca.pem");
  if (fs.existsSync(certPath)) {
    sslConfig.ca = fs.readFileSync(certPath);
  } else {
    console.warn(
      "⚠️ ca.pem not found at path, falling back to basic SSL settings."
    );
  }
} catch (error) {
  console.error("❌ Error reading ca.pem file:", error);
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  ssl: sslConfig,

  // Increased to 25 seconds to survive the Render -> DO Bangalore network latency
  connectTimeout: 25000,
});

module.exports = pool;
