const { sql, connectToDB } = require('../config/db.config');

async function getAllNotifications() {
  try {
    const pool = await connectToDB();
    const result = await pool.request().query('SELECT * FROM [Notification]');
    return result.recordset;
  } catch (error) {
    console.error('DB Error in getAllNotifications:', error);
    throw error;
  }
}

module.exports = {
  getAllNotifications,
};
