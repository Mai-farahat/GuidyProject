
const Cart = require('../models/cart.model');

exports.getAll = async (req, res) => {
  try {
    const data = await Cart.getAllCarts();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching carts' });
  }
};

exports.getByUser = async (req, res) => {
  const { userID } = req.params;
  try {
    const data = await Cart.getCartByUserID(userID);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart for user' });
  }
};

exports.create = async (req, res) => {
  const { UserID, totalPrice } = req.body;
  try {
    await Cart.createCart(UserID, totalPrice);
    res.status(201).json({ message: 'Cart created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating cart' });
  }
};

exports.delete = async (req, res) => {
  const { cartID } = req.params;
  try {
    await Cart.deleteCart(cartID);
    res.json({ message: 'Cart deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting cart' });
  }
};
