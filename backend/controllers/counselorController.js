// counselorController.js
const db = require('../config/db'); // Ensure this points to your database connection

// Fetch all counselors
const getCounselors = async (req, res) => {
    const query = 'SELECT * FROM Counselors'; // Adjust to your actual database query
    try {
        const [counselors] = await db.query(query);
        res.status(200).json(counselors);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching counselors' });
    }
};

// Add a new counselor
const addCounselor = async (req, res) => {
    const { name, email, specialization } = req.body; // Adjust according to your counselor model
    const query = 'INSERT INTO Counselors (name, email, specialization) VALUES (?, ?, ?)';

    try {
        const [result] = await db.query(query, [name, email, specialization]);
        res.status(201).json({ message: 'Counselor added successfully', counselor_Id: result.insertId });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error adding counselor' });
    }
};

// Delete a counselor
const deleteCounselor = async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Counselors WHERE id = ?';

    try {
        await db.query(query, [id]);
        res.status(200).json({ message: 'Counselor deleted successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error deleting counselor' });
    }
};

module.exports = {
    getCounselors,
    addCounselor,
    deleteCounselor,
};
