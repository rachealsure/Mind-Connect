const express = require('express');
const mysql = require('mysql2'); // Import mysql2
const app = express();

// Middleware
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', // replace with your MySQL username
    password: 'Hampty@2030', // your MySQL password
    database: 'mindconnect' // your database name
});

// Verify the connection to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL!');
    }
});

// Simple GET route for clients
app.get('/clients', (req, res) => {
    const query = 'SELECT * FROM clients'; // Adjust table name as necessary
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error fetching clients', error });
        }
        res.json({ message: 'Clients retrieved successfully', clients: results });
    });
});

// Simple POST route for adding clients
app.post('/clients/add', (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO clients (name, email, password) VALUES (?, ?, ?)';
    
    db.query(query, [name, email, password], (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error adding client', error });
        }
        res.json({ message: 'Client added successfully!', clientId: results.insertId });
    });
});

// Start the server
app.listen(3000, '127.0.0.1', () => {
    console.log('Server running on 127.0.0.1:3000');
});

