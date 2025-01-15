const Paper = require('../models/paper');
const Conference = require('../models/conference');
const User = require('../models/user');
const Review = require('../models/review');
const {assignReviewersToPaper} = require('../controllers/conferenceController');

const submitPaper = async (req, res) => {
  try {
    // JWT AUTH PENTRU SEMNATURA -> USER = AUTOR ; ID_USER O SA FIE IN CLAIMS
    const { title, abstract, fileUrl, conferenceId } = req.body;

    if (!title || !conferenceId) {
      return res.status(400).json({ error: 'Title and conferenceId are required.' });
    }

    const conference = await Conference.findByPk(conferenceId);
    if (!conference) {
      return res.status(404).json({ error: 'Conference not found.' });
    }

    const paper = await Paper.create({
      title,
      abstract,
      fileUrl,
      conferenceId,
      status: 'under review',
    });

    await assignReviewersToPaper(paper.id);

    const reviewers = await User.findAll({ where: { role: 'reviewer' }, limit: 2 });
    res.status(201).json({
      message: 'Paper submitted successfully!',
      paper,
    });
  } catch (error) {
    console.error('Error submitting paper:', error);
    res.status(500).json({ error: 'An error occurred while submitting the paper.' });
  }
};

const listSubmittedPapers = async (req, res) => {
  try {
    const { conferenceId } = req.query;

    if (!conferenceId) {
      return res.status(400).json({ error: 'ConferenceId is required.' });
    }

    const conference = await Conference.findByPk(conferenceId);
    if (!conference) {
      return res.status(404).json({ error: 'Conference not found.' });
    }

    const papers = await Paper.findAll({ where: { conferenceId } });

    res.status(200).json({
      message: 'Papers retrieved successfully!',
      papers,
    });
  } catch (error) {
    console.error('Error listing papers:', error);
    res.status(500).json({ error: 'An error occurred while listing papers.' });
  }
};

const getPaperDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const paper = await Paper.findByPk(id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'username'] },
        { model: Conference, attributes: ['id', 'title'] },
        {
          model: Review,
          include: [{ model: User, as: 'reviewer', attributes: ['id', 'username'] }],
        },
      ],
    });

    if (!paper) {
      return res.status(404).json({ error: 'Paper not found.' });
    }

    res.status(200).json({
      message: 'Paper details retrieved successfully!',
      paper,
    });
  } catch (error) {
    console.error('Error fetching paper details:', error);
    res.status(500).json({ error: 'An error occurred while fetching paper details.' });
  }
};

const updatePaper = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, abstract, fileUrl } = req.body;

    const paper = await Paper.findByPk(id);
    if (!paper) {
      return res.status(404).json({ error: 'Paper not found.' });
    }

    if (paper.status !== 'rejected') {
      return res.status(400).json({ error: 'Paper cannot be updated at this stage.' });
    }

    paper.title = title || paper.title;
    paper.abstract = abstract || paper.abstract;
    paper.fileUrl = fileUrl || paper.fileUrl;
    paper.status = 'under review';

    await paper.save();

    const reviews = await Review.findAll({ where: { paperId: id } });
    for (const review of reviews) {
      review.status = 'pending';
      await review.save();
    }

    res.status(200).json({
      message: 'Paper updated successfully, and reviews set to pending.',
      paper,
    });
  } catch (error) {
    console.error('Error updating paper:', error);
    res.status(500).json({ error: 'An error occurred while updating the paper.' });
  }
};


const deletePaper = async (req, res) => {
    try {
      const { id } = req.params;
  
      const paper = await Paper.findByPk(id);
      if (!paper) {
        return res.status(404).json({ error: 'Paper not found.' });
      }
  
      await Review.destroy({ where: { paperId: id } });
  
      await paper.destroy();
  
      res.status(200).json({
        message: 'Paper deleted successfully!',
      });
    } catch (error) {
      console.error('Error deleting paper:', error);
      res.status(500).json({ error: 'An error occurred while deleting the paper.' });
    }
};

const getAssignedReviewers = async (req, res) => {
  try {
    const paperId = parseInt(req.params.paperId);

    const reviews = await Review.findAll({
      where: { paperId },
      include: [
        {
          model: User, 
          as: 'reviewer',
          attributes: ['id', 'username'],
        },
      ],
    });

    if (reviews.length === 0) {
      return res.status(404).json({
        message: `No reviewers assigned for paper ID ${paperId}`,
      });
    }

    const assignedReviewers = reviews.map((review) => ({
      reviewerId: review.reviewer.id,
      name: review.reviewer.username,
      status: review.status,
    }));

    res.status(200).json({
      paperId,
      reviewers: assignedReviewers,
    });
  } catch (error) {
    console.error('Error fetching assigned reviewers:', error);
    res.status(500).json({ error: 'An error occurred while fetching reviewers.' });
  }
};



module.exports = {
  submitPaper,
  listSubmittedPapers,
  getPaperDetails,
  updatePaper,
  deletePaper,
  getAssignedReviewers,
};