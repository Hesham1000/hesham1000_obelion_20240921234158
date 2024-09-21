// eventsApp/backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { login, logout, recoverPassword } = require('../controllers/authController');

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

// Password recovery route
router.post('/recover-password', recoverPassword);

module.exports = router;
