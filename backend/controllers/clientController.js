const db = require('../config/db');

// Fetch client by ID
const getClient = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Clients WHERE id = ?';

    try {
        const [client] = await db.query(query, [id]);

        // Debugging: Add console log to see what the query returns
        console.log(`Client with ID ${id}:`, client);

        if (!client.length) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.status(200).json(client[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching client' });
    }
};


// Add a new client
const addClient = async (req, res) => {
    const { first_name, last_name, email, password_hash, phone, date_of_birth, gender, address } = req.body;

    console.log("Received request to add client:", req.body);  // Log incoming data

    if (!first_name || !last_name || !email || !password_hash || !phone || !date_of_birth || !gender || !address) {
        console.log("Missing required fields");  // Debug missing fields
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = 'INSERT INTO Clients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?)';

    try {
        const [result] = await db.query(query, [first_name, last_name, email, password_hash, phone, date_of_birth, gender, address]);
        console.log("Client added successfully:", result);  // Debug successful insert
        res.status(201).json({ message: 'Client added successfully', clientId: result.insertId });
    } catch (error) {
        console.error("Error adding client:", error);  // Log any errors
        res.status(500).json({ error: 'Error adding client' });
    }
};



// Delete a client
const deleteClient = async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Clients WHERE id = ?';

    try {
        await db.query(query, [id]);
        res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting client' });
    }
};

module.exports = {
    getClient,
    addClient,
    deleteClient
};
