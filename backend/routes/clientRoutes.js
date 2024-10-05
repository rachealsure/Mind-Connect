const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController'); 

// Routes
router.get('/:id', clientController.getClient);
router.post('/add', clientController.addClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;


