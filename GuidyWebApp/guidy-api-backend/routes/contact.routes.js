
const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController');

// Post a contact form message
router.post('/', ContactController.submitContactForm);

// Get all contact messages
router.get('/', ContactController.getAllContactMessages);

module.exports = router;




