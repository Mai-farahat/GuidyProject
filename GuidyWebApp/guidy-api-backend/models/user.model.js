
const { connectToDB } = require('../config/db.config');

const getAllUsers = async () => {
  const pool = await connectToDB();
  const result = await pool.request().query('SELECT * FROM Users');
  return result.recordset;
};


const getUserById = async (id) => {
  const pool = await connectToDB();
  const result = await pool
    .request()
    .input('UserID', id)
    .query('SELECT * FROM Users WHERE UserID = @UserID');
  return result.recordset[0]; // return one user
};

module.exports = {
  getAllUsers,
  getUserById
};
