
const HelpMessageModel = require('../models/helpmessages.model');

const HelpMessageController = {
  async sendHelpMessage(req, res) {
    try {
      const { userId, message } = req.body;
      if (!userId || !message) {
        return res.status(400).json({ error: 'User ID and message are required' });
      }
      await HelpMessageModel.createHelpMessage({ userId, message });
      res.status(201).json({ message: 'Help message submitted successfully' });
    } catch (err) {
      console.error('Error sending help message:', err);
      res.status(500).json({ error: 'Failed to send help message' });
    }
  },

  async getHelpMessages(req, res) {
    try {
      const messages = await HelpMessageModel.getAllHelpMessages();
      res.status(200).json(messages);
    } catch (err) {
      console.error('Error fetching help messages:', err);
      res.status(500).json({ error: 'Failed to fetch help messages' });
    }
  },

  async respondToMessage(req, res) {
    try {
      const { helpMessageId } = req.params;
      const { response } = req.body;
      if (!response) {
        return res.status(400).json({ error: 'Response is required' });
      }
      await HelpMessageModel.respondToHelpMessage({ helpMessageId, response });
      res.status(200).json({ message: 'Response submitted successfully' });
    } catch (err) {
      console.error('Error responding to help message:', err);
      res.status(500).json({ error: 'Failed to respond to help message' });
    }
  }
};

module.exports = HelpMessageController;
