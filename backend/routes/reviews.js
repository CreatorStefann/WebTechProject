const express = require('express');
const { submitReview, updateReview } = require('../controllers/reviewController');
const router = express.Router();

// Routes
router.post('/', submitReview); // POST /api/reviews
router.patch('/:id', updateReview);

module.exports = router;