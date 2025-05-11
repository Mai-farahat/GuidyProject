
const Payment = require('../models/payment.model');

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.getAllPayments();
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching payments' });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.getPaymentById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching payment' });
  }
};

exports.createPayment = async (req, res) => {
  try {
    await Payment.createPayment(req.body);
    res.status(201).json({ message: 'Payment created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating payment' });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    await Payment.deletePayment(req.params.id);
    res.json({ message: 'Payment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting payment' });
  }
};
