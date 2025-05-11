

const express = require('express');
const router = express.Router();
const HelpMessageController = require('../controllers/helpmessagesController');

router.post('/', HelpMessageController.sendHelpMessage); // POST /api/help
router.get('/', HelpMessageController.getHelpMessages); // GET /api/help
router.patch('/:helpMessageId', HelpMessageController.respondToMessage); // PATCH /api/help/:helpMessageId

module.exports = router;
