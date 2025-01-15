const express = require('express');
const { submitReview, updateReview ,getAssignedPapers} = require('../controllers/reviewController');
const { authenticate } = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');
const router = express.Router();

// Routes
router.post('/', authenticate, authorize('reviewer'), submitReview); // POST /api/reviews
router.patch('/:id', authenticate, authorize('reviewer'), updateReview);
//adaugat
router.get('/assigned-papers/:reviewerId', authenticate, authorize('reviewer'), getAssignedPapers);

module.exports = router;