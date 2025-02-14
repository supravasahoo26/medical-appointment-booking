// server.js
require('dotenv').config();  // Make sure this is at the top of your file
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/users');
const appointmentRoutes = require('./routes/appointments');
const doctorRoutes = require('./routes/doctorRoutes');
const authMiddleware = require('./middleware/authMiddleware');

// Initialize Express App
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/api', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);  // Correct route for doctors

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
