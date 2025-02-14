const db = require('../config/db');

async function getDoctors(req, res) {
  try {
    const [doctors] = await db.execute('SELECT * FROM doctors');
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching doctors', error: err.message });
  }
}

module.exports = {
  getDoctors,
};
