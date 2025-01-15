const express = require('express');
const { submitReview, updateReview ,getAssignedPapers} = require('../controllers/reviewController');
const router = express.Router();

// Routes
router.post('/', submitReview); // POST /api/reviews
router.patch('/:id', updateReview);
//adaugat
router.get('/assigned-papers/:reviewerId', getAssignedPapers);

module.exports = router;