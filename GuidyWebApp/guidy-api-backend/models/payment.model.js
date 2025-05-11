const { sql, connectToDB } = require('../config/db.config');

async function getAllPayments() {
  const pool = await connectToDB();
  const result = await pool.request().query('SELECT * FROM Payment');
  return result.recordset;
}

async function getPaymentById(id) {
  const pool = await connectToDB();
  const result = await pool.request()
    .input('PaymentID', sql.Int, id)
    .query('SELECT * FROM Payment WHERE PaymentID = @PaymentID');
  return result.recordset[0];
}

async function createPayment(data) {
  const { UserID, CartID, Amount, PaymentStatus, PaymentDate } = data;
  const pool = await connectToDB();
  await pool.request()
    .input('UserID', sql.Int, UserID)
    .input('CartID', sql.Int, CartID)
    .input('Amount', sql.Decimal(10, 2), Amount)
    .input('PaymentStatus', sql.NVarChar(50), PaymentStatus)
    .input('PaymentDate', sql.DateTime, PaymentDate)
    .query(`
      INSERT INTO Payment (UserID, CartID, Amount, PaymentStatus, PaymentDate)
      VALUES (@UserID, @CartID, @Amount, @PaymentStatus, @PaymentDate)
    `);
}

async function deletePayment(id) {
  const pool = await connectToDB();
  await pool.request()
    .input('PaymentID', sql.Int, id)
    .query('DELETE FROM Payment WHERE PaymentID = @PaymentID');
}

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment,
  deletePayment,
};
