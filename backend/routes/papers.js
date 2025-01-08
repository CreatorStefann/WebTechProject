const express = require('express');
const {
  submitPaper,
  listSubmittedPapers,
  getPaperDetails,
  updatePaper,
  deletePaper,
} = require('../controllers/paperController');
const router = express.Router();

router.post('/', submitPaper);        // POST /api/papers
router.get('/', listSubmittedPapers); // GET /api/papers
router.get('/:id', getPaperDetails);  // GET /api/papers/:id
router.patch('/:id', updatePaper);    // PATCH /api/papers/:id
router.delete('/:id', deletePaper);   // DELETE /api/papers/:id

module.exports = router;