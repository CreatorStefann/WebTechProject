const express = require('express');
const { createConference, listConferences } = require('../controllers/conferenceController');
const { authenticate } = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');
const router = express.Router();

router.post('/', authenticate, authorize('organizer'), createConference); // POST /api/conferences

router.get('/', authenticate, listConferences); // GET /api/conferences

module.exports = router;
