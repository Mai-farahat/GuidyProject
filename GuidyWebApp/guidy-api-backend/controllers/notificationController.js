const Notification = require('../models/notification.model');

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.getAllNotifications();
    res.json(notifications);
  } catch (err) {
    console.error('Controller error:', err);
    res.status(500).json({ error: 'Error fetching notifications' });
  }
};
