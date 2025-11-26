const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mysql = require('mysql2');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Middleware
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', // replace with your MySQL username
    password: 'Lifelineray123', // your MySQL password
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
        res.json({ message: 'Users retrieved successfully', user: results });
    });
});

// Simple POST route for clients
app.post('/clients/add', (req, res) => {
    console.log("Received data:", req.body);
    res.json({ message: 'Client added successfully!' });
}); 

// Registration route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into database
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error registering user', error: err });
            }
            res.redirect('/login');
        });
    } catch (err) {
        res.status(500).json({ message: 'Error processing registration', error: err });
    }
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1', () => {
    console.log('Server running on 127.0.0.1:3000');
});
