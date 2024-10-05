// resourceController.js

const db = require('../config/db');

// Fetch all resources
const getResources = async (req, res) => {
    const query = 'SELECT * FROM Resources'; // Define your query
    try {
        const [resources] = await db.query(query); // Correctly await the result
        res.status(200).json(resources);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching resources' });
    }
};

// Add a new resource (Admin only)
const addResource = async (req, res) => {
    const { category, title, content } = req.body;
    const query = 'INSERT INTO Resources (category, title, content) VALUES (?, ?, ?)';

    try {
        const [result] = await db.query(query, [category, title, content]);
        res.status(201).json({ message: 'Resource added successfully', resourceId: result.insertId });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error adding resource' });
    }
};

// Delete a resource (Admin only)
const deleteResource = async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Resources WHERE id = ?';

    try {
        await db.query(query, [id]);
        res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error deleting resource' });
    }
};

// Export the functions
module.exports = {
    getResources,
    addResource,  
    deleteResource,
};

