// routes/appointments.js
const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/appointments', authMiddleware, appointmentsController.getAppointments);

router.post('/bookappointments', authMiddleware, appointmentsController.bookAppointment);

router.put('/update_appointment/:appointmentId', authMiddleware, appointmentsController.updateAppointment);

router.delete('/delete_appointment/:appointmentId', authMiddleware, appointmentsController.deleteAppointment);


module.exports = router;
