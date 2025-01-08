const express = require('express');
const { submitReview } = require('../controllers/reviewController');
const router = express.Router();

// Routes
router.post('/', submitReview); // POST /api/reviews

module.exports = router;