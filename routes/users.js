const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// register user
router.post('/register', usersController.registerUser);

// login user
router.post('/login', usersController.loginUser);

module.exports = router;
