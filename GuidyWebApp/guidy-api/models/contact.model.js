const sql = require('mssql');
const dbConfig = require('../config/db.config'); // Make sure this is correct

const ContactModel = {
  // Method to add a contact message
  async addContact({ name, email, message, userId = null }) {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request()
        .input('Name', sql.NVarChar(100), name)
        .input('Email', sql.NVarChar(100), email)
        .input('Message', sql.NVarChar(sql.MAX), message)
        .input('UserID', sql.Int, userId)
        .query(
          'INSERT INTO ContactUs (UserID, Name, Email, Message) VALUES (@UserID, @Name, @Email, @Message)'
        );
      return result;
    } catch (err) {
      throw err;
    }
  },

  // Method to fetch all contact messages
  async getAllContacts() {
    try {
      const pool = await sql.connect(dbConfig);
      const result = await pool.request().query('SELECT * FROM ContactUs');
      return result.recordset; // Return the fetched rows
    } catch (err) {
      throw err;
    }
  }
};

module.exports = ContactModel;



