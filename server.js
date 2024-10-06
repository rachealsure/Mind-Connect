const express = require('express');
const mysql = require('mysql2'); // Import mysql2
const app = express();

// Middleware
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', // replace with your MySQL username
    password: 'Hampty2030', // your MySQL password
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

// Simple GET route for user
app.get('/user', (req, res) => {
    const query = 'SELECT * FROM user'; // Adjust table name as necessary
    db.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Error fetching user', error });
        }
        res.json({ message: 'Use retrieved successfully', user: results });
    });
});

// Simple POST route for clients
app.post('/clients/add', (req, res) => {
    console.log("Received data:", req.body);
    res.json({ message: 'Client added successfully!' });
}); 

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user into database
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) throw err;
        res.redirect('/login');
    });
});


// Start the server
app.listen(5500, '127.0.0.1', () => {
    console.log('Server running on 127.0.0.1:5500');
});
