const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',               // Or 'root' if using root
  password: 'Hampty2030',        // Make sure to use the correct password
  database: 'mindconnect',     // Replace with your actual database name
  waitForConnections: true,       // Optional settings for managing the pool
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the database as id ' + connection.threadId);
    connection.release();
  } catch (err) {
    console.error('Error connecting to the database:', err.stack);
  }
})();

module.exports = pool;
