// require("dotenv").config();
// const sql = require("mssql");
// console.log("🌍 ENV server →", process.env.DB_SERVER);
// console.log("🌍 type of server server →", typeof process.env.DB_SERVER);

// const config = {
//   server: process.env.DB_SERVER,
//   database: process.env.DB_NAME,
//   port: parseInt(process.env.DB_PORT),
//   user: process.env.DB_USER || '',        
//   password: process.env.DB_PASSWORD || '',
//   options: {
//     encrypt: true,
//     trustServerCertificate: true,
//     enableArithAbort: true,
//     integratedSecurity: true
//   },
//   authentication: {
//     type: 'default',
//     options: {
//       trustedConnection: true,
//       integratedSecurity: true
//     }
//   },
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 30000
//   }
// };

// const connectToDB = async () => {
//   try {
//     const pool = await sql.connect(config);
//     console.log("Connected to SQL Server...");
//     return pool;
//   } catch (err) {
//     console.error("DB Connection Failed:", err.message);
//     throw err;
//   }
// };

// module.exports = {
//   sql,
//   config,
//   connectToDB
// };


require("dotenv").config();
const sql = require("mssql");

console.log("🌍 ENV server →", process.env.DB_SERVER);
console.log("🌍 Type of server server →", typeof process.env.DB_SERVER);

const config = {
  user: process.env.DB_USER, // 'sa'
  password: process.env.DB_PASSWORD, // 'newalaa123'
  server: process.env.DB_SERVER, // 'DESKTOP-50ROGE5'
  database: process.env.DB_NAME, // 'Guidy'
  port: parseInt(process.env.DB_PORT), // 1433
  options: {
    encrypt: true, // Use encryption
    trustServerCertificate: true, // Disable SSL certificate validation (for local dev)
    enableArithAbort: true, // Enable arithmetic abort
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
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
  config,
  connectToDB,
};










