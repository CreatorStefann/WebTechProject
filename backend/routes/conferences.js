const express = require('express');
const { createConference, listConferences } = require('../controllers/conferenceController');
const router = express.Router();

router.post('/', createConference); // POST /api/conferences
router.get('/', listConferences);   // GET /api/conferences

module.exports = router;
