const express = require('express');
const { registerClient, loginClient, logoutClient } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerClient);
router.post('/login', loginClient);
router.post('/logout', logoutClient);

module.exports = router;
