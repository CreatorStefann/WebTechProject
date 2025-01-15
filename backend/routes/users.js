const express = require('express');
const { registerUser, getAllUsers } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');
const router = express.Router();

// Routes
router.get('/', getAllUsers);         // GET /api/users

module.exports = router;
