const express = require('express');
const {
  submitPaper,
  listSubmittedPapers,
  getPaperDetails,
  updatePaper,
  deletePaper,
  getAssignedReviewers
} = require('../controllers/paperController');
const { authenticate } = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');
const router = express.Router();

router.post('/', authenticate, authorize('author'), submitPaper);        // POST /api/papers
router.get('/', authenticate, authorize('organizer'), listSubmittedPapers); // GET /api/papers
router.get('/:id',authenticate, authorize('organizer', 'reviewer'), getPaperDetails);  // GET /api/papers/:id
router.patch('/:id', authenticate, authorize('author'), updatePaper);    // PATCH /api/papers/:id
router.delete('/:id', authenticate, authorize('organizer'), deletePaper);   // DELETE /api/papers/:id
router.get('/:paperId/reviewers', authenticate, authorize('organizer'), getAssignedReviewers);

module.exports = router;