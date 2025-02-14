const db = require('../config/db');
const moment = require('moment');

// check if doctor is available
async function checkDoctorAvailability(doctorId, appointmentDate) {
  const startTime = moment(appointmentDate);
  const endTime = startTime.clone().add(1, 'hour');

  const [appointments] = await db.execute(
    'SELECT * FROM appointments WHERE doctor_id = ? AND appointment_date BETWEEN ? AND ?',
    [doctorId, startTime.format('YYYY-MM-DD HH:mm:ss'), endTime.format('YYYY-MM-DD HH:mm:ss')]
  );

  return appointments.length === 0; // No appointments found means doctor is available
}

// book an appointment
async function bookAppointment(req, res) {
  const { doctorId, appointmentDate } = req.body;
  const userId = req.user.id; // From JWT token

  try {
    const available = await checkDoctorAvailability(doctorId, appointmentDate);

    if (!available) {
      return res.status(400).json({ message: 'Doctor is already busy at this time.' });
    }

    // create the appointment
    const [result] = await db.execute(
      'INSERT INTO appointments (user_id, doctor_id, appointment_date, status) VALUES (?, ?, ?, ?)',
      [userId, doctorId, appointmentDate, "Confirmed"]
    );

    res.status(200).json({ message: 'Appointment booked successfully', appointmentId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error booking the appointment', error: err.message });
  }
}

async function getAppointments(req, res) {
    const userId = req.user.id;  // The user is added to the request object  authMiddleware
  
    try {
      const [appointments] = await db.execute('SELECT * FROM appointments WHERE user_id = ?', [userId]);
      res.status(200).json(appointments);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching appointments', error: err.message });
    }
  }

  async function updateAppointment(req, res) {
    const appointmentId = req.params.appointmentId; 
    const { doctorId, appointmentDate } = req.body;  
    const userId = req.user.id; 
  
    try {
      // check if the appointment exists and belongs to the logged-in user
      const [appointment] = await db.execute('SELECT * FROM appointments WHERE id = ? AND user_id = ?', [appointmentId, userId]);
      if (appointment.length === 0) {
        return res.status(404).json({ message: 'Appointment not found or does not belong to you' });
      }
  
      // check if the doctor is already booked at this time
      const [existingAppointments] = await db.execute(
        'SELECT * FROM appointments WHERE doctor_id = ? AND appointment_date = ? AND id != ?',
        [doctorId, appointmentDate, appointmentId]
      );
      //if booked
      if (existingAppointments.length > 0) {
        return res.status(400).json({ message: 'Doctor is already booked at this time' });
      }
  
      // update the appointment in the database
      await db.execute(
        'UPDATE appointments SET doctor_id = ?, appointment_date = ? WHERE id = ?',
        [doctorId, appointmentDate, appointmentId]
      );
  
      res.status(200).json({ message: 'Appointment updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error updating appointment', error: err.message });
    }
  }
  
  
  // delete an appointment
  async function deleteAppointment(req, res) {
    const appointmentId = req.params.appointmentId;
    const userId = req.user.id;  // User ID from JWT token
  
    try {
      // check if the appointment exists and belongs to the logged-in user
      const [appointment] = await db.execute('SELECT * FROM appointments WHERE id = ? AND user_id = ?', [appointmentId, userId]);
      if (appointment.length === 0) {
        return res.status(404).json({ message: 'Appointment not found or does not belong to you' });
      }
  
      // delete the appointment from the database
      await db.execute('DELETE FROM appointments WHERE id = ?', [appointmentId]);
  
      res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting appointment', error: err.message });
    }
  }
  
module.exports = {
  bookAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
};
