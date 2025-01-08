const Paper = require('../models/paper');
const Conference = require('../models/conference');
const User = require('../models/user');
const Review = require('../models/review');

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
      status: 'feedback given',
    });

    const reviewers = await User.findAll({ where: { role: 'reviewer' }, limit: 2 });
    // if (reviewers.length < 2) {
    //   return res.status(500).json({ error: 'Not enough reviewers available.' });
    // }

    await Promise.all(
      reviewers.map((reviewer) =>
        Review.create({
          paperId: paper.id,
          reviewerId: reviewer.id,
        })
      )
    );

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

    if (paper.status !== 'feedback given') {
      return res.status(400).json({ error: 'Paper cannot be updated at this stage.' });
    }

    paper.title = title || paper.title;
    paper.abstract = abstract || paper.abstract;
    paper.fileUrl = fileUrl || paper.fileUrl;
    paper.status = 'submitted';

    await paper.save();

    res.status(200).json({
      message: 'Paper updated successfully!',
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

module.exports = {
  submitPaper,
  listSubmittedPapers,
  getPaperDetails,
  updatePaper,
  deletePaper,
};