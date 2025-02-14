const mysql = require('mysql2');

// createing a MySQL connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// testing the connection using the promise-based API
pool.promise().query('SELECT 1')
    .then(([rows, fields]) => {
        console.log('Successfully connected to the database!');
    })
    .catch(error => {
        console.error('Error connecting to the database:', error.message);
    });

// export the pool to use in other files
module.exports = pool.promise();
