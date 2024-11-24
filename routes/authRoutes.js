const express = require('express');
const { signup, login, getUserDetails } = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

// Protected Route: Get User Details
router.get('/me', authenticateToken, getUserDetails);

module.exports = router;
