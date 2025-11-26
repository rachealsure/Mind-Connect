const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const cors = require('cors');

// Initialize Express app
const app = express();

app.use(cors());

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: '62e07526f958425d2cd6f26f757110114e472579dc80db2c99929a7dbe0334a94700716975c851d8aca93c39f22258dfeeacf5881d3da3dbcac9e2f6336dca3b',
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport and use sessions
app.use(passport.initialize());
app.use(passport.session());

// Connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hampty2030',
    database: 'mindconnect'
});

// Check connection
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Passport Local Strategy for Authentication
passport.use(new LocalStrategy((username, password, done) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return done(err);
        if (results.length === 0) return done(null, false, { message: 'Incorrect username' });

        const user = results[0];
        
        // Compare password hash
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password' });
            }
        });
    });
}));

// Passport serialization and deserialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        done(null, results[0]);
    });
});

// Route to display registration form
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle registration form submission
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

// Route to display login form
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle login form submission
app.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

// Route to display dashboard (protected)
app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Welcome ${req.user.username}, you are logged in!`);
    } else {
        res.redirect('/login');
    }
});

// Logout
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) throw err;
        res.redirect('/login');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
