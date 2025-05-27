const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/friends', userController.getFriends);

module.exports = router;