// appointmentRoutes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController'); // Adjust according to your controller path

// Define your routes here
router.get('/', appointmentController.getAppointments); // Route to get all appointments
router.post('/', appointmentController.addAppointment); // Route to add a new appointment
router.delete('/:id', appointmentController.deleteAppointment); // Route to delete an appointment by ID

module.exports = router; // Export the router
