
const express = require('express');
const router = express.Router();
const controller = require('../controllers/courseWishlistController');

router.get('/', controller.getAll);
router.post('/', controller.add);
router.delete('/', controller.remove);

module.exports = router;
