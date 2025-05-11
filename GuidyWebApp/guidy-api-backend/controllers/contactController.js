
const ContactModel = require('../models/contact.model');

const ContactController = {
  // Controller for submitting a contact form message
  async submitContactForm(req, res) {
    try {
      const { name, email, message, userId } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, Email, and Message are required' });
      }

      await ContactModel.addContact({ name, email, message, userId });

      res.status(201).json({ message: 'Contact message submitted successfully' });
    } catch (error) {
      console.error('Error in submitContactForm:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Controller for fetching all contact messages
  async getAllContactMessages(req, res) {
    try {
      const contactMessages = await ContactModel.getAllContacts();

      if (contactMessages.length === 0) {
        return res.status(404).json({ message: 'No contact messages found' });
      }

      res.status(200).json(contactMessages);
    } catch (error) {
      console.error('Error in fetching contact messages:', error);
      res.status(500).json({ error: 'Failed to fetch contact messages' });
    }
  }
};

module.exports = ContactController;



