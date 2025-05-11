const { connectToDB, sql } = require('../config/db.config');
const { loadSqlQueries } = require('../utils/sqlLoader');

const register = async (req, res) => {
  try {
    const { FirstName, LastName, UserName, Email, Password } = req.body;
    const pool = await connectToDB();
    const queries = await loadSqlQueries('users');

    // Directly store the Password without hashing
    await pool.request()
      .input('FirstName', sql.NVarChar, FirstName)
      .input('LastName', sql.NVarChar, LastName)
      .input('UserName', sql.NVarChar, UserName)
      .input('Email', sql.VarChar, Email)
      .input('Password', sql.VarChar, Password)  // No bcrypt hashing here
      .query(queries.register);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).send('Server Error during registration');
  }
};

const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const pool = await connectToDB();
    const queries = await loadSqlQueries('users');

    const result = await pool.request()
      .input('Email', sql.VarChar, Email)
      .query(queries.login);

    const user = result.recordset[0];
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // Directly compare the input password with the stored password
    if (Password !== user.Password) return res.status(401).json({ message: 'Invalid password' });

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).send('Server Error during login');
  }
};

module.exports = { register, login };



