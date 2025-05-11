const express = require('express');
const router = express.Router();
const parseId = require('../middlewares/parseId');
const { getUsersHandler, getUserByIdHandler } = require('../controllers/userController');

router.get('/', getUsersHandler);               // /api/users
router.get('/:id', parseId, getUserByIdHandler); // /api/users/1

module.exports = router;
