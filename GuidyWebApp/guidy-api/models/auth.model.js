
const { connectToDB, sql } = require('../config/db.config');

// تسجيل مستخدم جديد
const registerUser = async ({ username, email, password, role }) => {
  const pool = await connectToDB();

  const result = await pool.request()
    .input('UserName', sql.NVarChar, username)
    .input('Email', sql.VarChar, email)
    .input('Password', sql.VarChar, password) // لو هتعملي هاشينج لاحقًا بنضيف هنا
    .input('Role', sql.VarChar, role || 'Student')
    .query(`
      INSERT INTO Users (UserName, Email, Password, Role)
      VALUES (@UserName, @Email, @Password, @Role)
    `);

  return result.rowsAffected[0]; // 1 if inserted
};

// تسجيل الدخول
const loginUser = async ({ email, password }) => {
  const pool = await connectToDB();

  const result = await pool.request()
    .input('Email', sql.VarChar, email)
    .input('Password', sql.VarChar, password)
    .query(`
      SELECT * FROM Users WHERE Email = @Email AND Password = @Password
    `);

  return result.recordset[0];
};

module.exports = {
  registerUser,
  loginUser
};
