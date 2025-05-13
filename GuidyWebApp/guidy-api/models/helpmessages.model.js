const { sql, config } = require('../config/db.config');
console.log("Full DB config", config);

const HelpMessageModel = {
  async createHelpMessage({ userId, message }) {
    const pool = await sql.connect(config);
    await pool.request()
      .input('UserID', sql.Int, userId)
      .input('Message', sql.NVarChar(sql.MAX), message)
      .query(`
        INSERT INTO HelpMessage (UserID, Message, Status, CreatedAt)
        VALUES (@UserID, @Message, 'Pending', GETDATE())
      `);
  },

  async getAllHelpMessages() {
    try {
      const pool = await sql.connect(config);
      const result = await pool.request().query(`
        SELECT HelpMessageID, UserID, Message, Status, AdminResponse, ResponseDate, CreatedAt
        FROM HelpMessage
        ORDER BY CreatedAt DESC
      `);
      return result.recordset;
    } catch (err) {
      console.error("❌ DB Error in getAllHelpMessages:", err);
      throw err;
    }
  },

  async respondToHelpMessage({ helpMessageId, response }) {
    const pool = await sql.connect(config);
    await pool.request()
      .input('HelpMessageID', sql.Int, helpMessageId)
      .input('AdminResponse', sql.NVarChar(sql.MAX), response)
      .query(`
        UPDATE HelpMessage
        SET AdminResponse = @AdminResponse,
            Status = 'Resolved',
            ResponseDate = GETDATE()
        WHERE HelpMessageID = @HelpMessageID
      `);
  }
};

module.exports = HelpMessageModel;