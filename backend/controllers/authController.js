const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.registerClient = async (req, res) => {
    const { first_name, last_name, email, password, phone, date_of_birth, gender, address } = req.body;
    const password_hash = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO Clients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    try {
        const [result] = await db.query(query, [first_name, last_name, email, password_hash, phone, date_of_birth, gender, address]);
        res.status(201).json({ message: 'Client registered successfully', clientId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error registering client' });
    }
};

exports.loginClient = async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Clients WHERE email = ?';

    try {
        const [clients] = await db.query(query, [email]);
        const client = clients[0];
        if (client && await bcrypt.compare(password, client.password_hash)) {
            req.session.userId = client.id;
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

exports.logoutClient = (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logout successful' });
};
