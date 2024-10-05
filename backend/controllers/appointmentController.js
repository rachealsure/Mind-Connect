// appointmentController.js
const db = require('../config/db'); 

// Fetch all appointments
const getAppointments = async (req, res) => {
    const query = 'SELECT * FROM Appointments'; 
    try {
        const [appointments] = await db.query(query);
        res.status(200).json(appointments);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: 'Error fetching appointments' });
    }
};

// Add a new appointment
const addAppointment = async (req, res) => {
    const { client_Id, counselor_Id, appointment_date, appointment_time } = req.body; 
    const query = 'INSERT INTO Appointments (client_Id, counselor_Id, appointment_date, appointment_time) VALUES (?, ?, ?, ?)';

    try {
        const [result] = await db.query(query, [client_Id, counselor_Id, appointment_date, appointment_time]);
        res.status(201).json({ message: 'Appointment added successfully', appointment_Id: result.insertId });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error adding appointment' });
    }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Appointments WHERE id = ?';

    try {
        await db.query(query, [id]);
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error deleting appointment' });
    }
};

module.exports = {
    getAppointments,
    addAppointment,
    deleteAppointment,
};
