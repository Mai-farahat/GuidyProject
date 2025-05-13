const { connectToDB, sql } = require('../config/db.config');
const { loadSqlQueries } = require('../utils/sqlLoader');

const bcrypt = require('bcrypt');

const register = async (req, res) => {
  try {
    const { UserName, Email, Password } = req.body;

    // 1. Check required fields
    if (!UserName || !Email || !Password) {
      return res.status(400).json({ message: 'UserName, Email, and Password are required.' });
    }

    // 2. Validate email format
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(Email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // 3. Validate password length
    if (Password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    const pool = await connectToDB();

    // 4. Check if UserName or Email already exists
    const checkQuery = `
      SELECT 1 FROM Users WHERE UserName = @UserName OR Email = @Email
    `;
    const checkResult = await pool.request()
      .input('UserName', sql.NVarChar, UserName)
      .input('Email', sql.VarChar, Email)
      .query(checkQuery);

    if (checkResult.recordset.length > 0) {
      return res.status(409).json({ message: 'UserName or Email already exists.' });
    }

    // 5. Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // 6. Insert the user (FirstName, LastName, Role will be null/default)
    const queries = await loadSqlQueries('users');
    await pool.request()
      .input('FirstName', sql.NVarChar, req.body.FirstName || null)
      .input('LastName', sql.NVarChar, req.body.LastName || null)
      .input('UserName', sql.NVarChar, UserName)
      .input('Email', sql.VarChar, Email)
      .input('Password', sql.VarChar, hashedPassword)
      .query(queries.register);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server Error during registration' });
  }
};

const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    console.log('Login attempt for email:', Email);
    
    const pool = await connectToDB();
    const queries = await loadSqlQueries('users');

    const result = await pool.request()
      .input('Email', sql.VarChar, Email)
      .query(queries.login);

    console.log('Query result:', result.recordset);
    const user = result.recordset[0];

    if (!user) {
      console.log('No user found with email:', Email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('User found, comparing passwords');
    const isMatch = await bcrypt.compare(Password, user.Password);
    
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ message: 'Invalid password' });
    }

    console.log('Login successful for user:', Email);
    // Remove password from user object before sending response
    const { Password: _, ...userWithoutPassword } = user;
    res.status(200).json({ 
      message: 'Login successful', 
      user: userWithoutPassword 
    });
  } catch (error) {
    console.error('Login Error Details:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ message: 'Server Error during login' });
  }
};

module.exports = { register, login };
