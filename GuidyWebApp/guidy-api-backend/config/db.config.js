const sql = require("mssql");
require("dotenv").config();

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER || '',        
  password: process.env.DB_PASSWORD || '',
  options: {
    trustedConnection: true,
    trustServerCertificate: true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
  
};

const connectToDB = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("Connected to SQL Server...");
    return pool;
  } catch (err) {
    console.error("DB Connection Failed:", err.message);
    throw err;
  }
};

module.exports = {
  sql,
  connectToDB
};


