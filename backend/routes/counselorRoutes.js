// counselorRoutes.js
const express = require('express');
const router = express.Router();
const counselorController = require('../controllers/counselorController'); // Adjust according to your controller path

// Define your routes here
router.get('/', counselorController.getCounselors); // Route to get all counselors
router.post('/', counselorController.addCounselor); // Route to add a new counselor
router.delete('/:id', counselorController.deleteCounselor); // Route to delete a counselor by ID

module.exports = router; // Export the router
