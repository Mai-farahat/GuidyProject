const { getAllUsers, getUserById } = require('../models/user.model');

const getUsersHandler = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Server Error');
  }
};

const getUserByIdHandler = async (req, res) => {
  try {
    const id = req.parsedId;
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getUsersHandler,
  getUserByIdHandler
};
