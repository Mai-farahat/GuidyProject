
const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartController');

router.get('/', controller.getAll);
router.get('/:userID', controller.getByUser);
router.post('/', controller.create);
router.delete('/:cartID', controller.delete);

module.exports = router;
