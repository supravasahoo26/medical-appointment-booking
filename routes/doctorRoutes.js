const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctorController');

// get list of doctors
router.get('/', doctorsController.getDoctors);

module.exports = router;
