
const { connectToDB } = require('../config/db.config');

// جلب كل المستخدمين
const getAllUsers = async () => {
  const pool = await connectToDB();
  const result = await pool.request().query('SELECT * FROM Users');
  return result.recordset;
};

// جلب مستخدم واحد بالـ ID
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
