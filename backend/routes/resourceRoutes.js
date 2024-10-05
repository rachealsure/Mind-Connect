// resourceRoutes.js

const express = require('express');
const router = express.Router();
const { getResources, addResource, deleteResource } = require('../controllers/resourceController');

// Define your routes
router.get('/', getResources); // Fetch all resources
router.post('/', addResource);  // Add a new resource
router.delete('/:id', deleteResource); // Delete a resource

module.exports = router;






