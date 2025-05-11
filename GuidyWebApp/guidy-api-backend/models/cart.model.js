const { sql, connectToDB } = require('../config/db.config');

async function getAllCarts() {
  try {
    const pool = await connectToDB();
    const result = await pool.request().query('SELECT * FROM [Cart]');
    return result.recordset;
  } catch (error) {
    console.error('DB Error in getAllCarts:', error);
    throw error;
  }
}

async function getCartByUserID(userID) {
  try {
    const pool = await connectToDB();
    const result = await pool.request()
      .input('UserID', sql.Int, userID)
      .query('SELECT * FROM [Cart] WHERE UserID = @UserID');
    return result.recordset[0];
  } catch (error) {
    console.error('DB Error in getCartByUserID:', error);
    throw error;
  }
}

async function createCart(userID, totalPrice) {
  try {
    const pool = await connectToDB();
    await pool.request()
      .input('UserID', sql.Int, userID)
      .input('totalPrice', sql.Decimal(10, 2), totalPrice)
      .query(`
        INSERT INTO [Cart] (UserID, totalPrice, CreatedAt)
        VALUES (@UserID, @totalPrice, GETDATE())
      `);
  } catch (error) {
    console.error('DB Error in createCart:', error);
    throw error;
  }
}

async function deleteCart(cartID) {
  try {
    const pool = await connectToDB();
    await pool.request()
      .input('CartID', sql.Int, cartID)
      .query('DELETE FROM [Cart] WHERE CartID = @CartID');
  } catch (error) {
    console.error('DB Error in deleteCart:', error);
    throw error;
  }
}

module.exports = {
  getAllCarts,
  getCartByUserID,
  createCart,
  deleteCart,
};
