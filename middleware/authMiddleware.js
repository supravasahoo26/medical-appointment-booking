const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authMiddleware(req, res, next) {
    console.log("Request Headers:", req.headers);  
  
    const token = req.headers['authorization']?.split(' ')[1];
    console.log("Token Extracted:", token);  // log extracted token
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      req.user = decoded; 
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized', error: err.message });
    }
  }
  

module.exports = authMiddleware;
