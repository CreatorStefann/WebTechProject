const Review = require('../models/review');
const Paper = require('../models/paper');
const User = require('../models/user');

const submitReview = async (req, res) => {
  try {
    const { paperId, feedback, rating, status, reviewerId } = req.body;

    if (!paperId || !status || !['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'PaperId, status (accepted/rejected), and feedback are required.' });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    const paper = await Paper.findByPk(paperId);
    if (!paper) {
      return res.status(404).json({ error: 'Paper not found.' });
    }

    if (paper.status !== 'under review') {
      return res.status(400).json({ error: 'Paper is not under review.' });
    }

    // Check if the reviewer is assigned to this paper
    const existingReview = await Review.findOne({
      where: { paperId, reviewerId}, // Assuming `req.user.id` is populated
    });

    if (!existingReview) {
      return res.status(403).json({ error: 'You are not assigned to review this paper.' });
    }

    // Update the review with feedback, rating, and status
    existingReview.feedback = feedback;
    existingReview.rating = rating;
    existingReview.status = status;
    await existingReview.save();

    // Check if both reviews are submitted and update paper status
    const reviews = await Review.findAll({ where: { paperId } });
    if (reviews.length >= 2) {
      const hasRejected = reviews.some((r) => r.status && r.status.includes('rejected'));
      paper.status = hasRejected ? 'rejected' : 'accepted';
      await paper.save();
    }

    res.status(200).json({
      message: 'Review submitted successfully!',
      review: existingReview,
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ error: 'An error occurred while submitting the review.' });
  }
};

const updateReview = async (req, res) => {
  try {
    const { paperId, feedback, rating, status, reviewerId } = req.body;

    if (!paperId || !status || !['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'PaperId, status (accepted/rejected), and feedback are required.' });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    const paper = await Paper.findByPk(paperId);
    if (!paper) {
      return res.status(404).json({ error: 'Paper not found.' });
    }

    if (paper.status !== 'under review') {
      return res.status(400).json({ error: 'Paper is not under review.' });
    }

    const existingReview = await Review.findOne({
      where: { paperId, reviewerId },
    });

    if (!existingReview) {
      return res.status(403).json({ error: 'You are not assigned to review this paper.' });
    }

    if (existingReview.status !== 'pending') {
      return res.status(400).json({ error: 'You have already submitted a review for this paper.' });
    }

    existingReview.feedback = feedback;
    existingReview.rating = rating;
    existingReview.status = status;
    await existingReview.save();

    const reviews = await Review.findAll({ where: { paperId, status: 'pending' } });
    if (reviews.length === 0) {
      const hasRejected = reviews.some((r) => r.status === 'rejected');
      paper.status = hasRejected ? 'rejected' : 'accepted';
      await paper.save();
    }

    res.status(200).json({
      message: 'Review updated successfully!',
      review: existingReview,
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'An error occurred while updating the review.' });
  }
};

module.exports = {
  submitReview,
  updateReview,
};
