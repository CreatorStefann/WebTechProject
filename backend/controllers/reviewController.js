const Review = require('../models/review');
const Paper = require('../models/paper');
//modificat
const Conference = require('../models/conference');
//adaugat Conference model pentru get assigned papers
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

    const existingReview = await Review.findOne({
      where: { paperId, reviewerId},
    });

    if (!existingReview) {
      return res.status(403).json({ error: 'You are not assigned to review this paper.' });
    }

    existingReview.feedback = feedback;
    existingReview.rating = rating;
    existingReview.status = status;
    await existingReview.save();

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

    if (!paperId || !status || !['accepted', 'rejected', 'conditionally accepted'].includes(status)) {
      return res.status(400).json({ error: 'PaperId, status (accepted/rejected/conditionally accepted), and feedback are required.' });
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

    const allReviews = await Review.findAll({ where: { paperId } });
    const pendingReviews = allReviews.filter((r) => r.status === 'pending').length;
    const hasRejected = allReviews.some((r) => r.status === 'rejected');
    const hasConditionallyAccepted = allReviews.some((r) => r.status === 'conditionally accepted');

    if (pendingReviews === 0) {
      if (hasRejected) {
        paper.status = 'rejected';
      } else if (hasConditionallyAccepted) {
        paper.status = 'conditionally accepted';
      } else {
        paper.status = 'accepted';
      }

      await paper.save();
    }

    res.status(200).json({
      message: 'Review updated successfully!',
      review: existingReview,
      paperStatus: paper.status,
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'An error occurred while updating the review.' });
  }
};

const getAssignedPapers = async (req, res) => {
  try {
    const { reviewerId } = req.params;

    const reviews = await Review.findAll({
      where: { reviewerId },
      include: [
        {
          model: Paper,
          attributes: ['id', 'title', 'abstract', 'fileUrl', 'status'],
          include: [{ model: Conference, attributes: ['id', 'title', 'startDate', 'endDate'] }],
        },
      ],
    });

    if (!reviews || reviews.length === 0) {
      return res.status(200).json({ papers: [] });
    }

    const papers = reviews.map((review) => ({
      reviewId: review.id,
      paperId: review.Paper.id,
      title: review.Paper.title,
      abstract: review.Paper.abstract,
      fileUrl: review.Paper.fileUrl,
      status: review.Paper.status,
      feedback: review.feedback,
      rating: review.rating,
      conference: review.Paper.Conference
        ? {
            id: review.Paper.Conference.id,
            title: review.Paper.Conference.title,
            startDate: review.Paper.Conference.startDate,
            endDate: review.Paper.Conference.endDate,
          }
        : null,
    }));

    res.status(200).json({ papers });
  } catch (error) {
    console.error('Error fetching assigned papers:', error);
    res.status(500).json({ error: 'An error occurred while fetching assigned papers.' });
  }
};
const getSubmittedReviews = async (req, res) => {
  try {
    const { reviewerId } = req.params;

    const reviews = await Review.findAll({
      where: { reviewerId },
      include: [
        {
          model: Paper,
          attributes: ['title', 'abstract', 'fileUrl'],
        },
      ],
    });

    if (!reviews.length) {
      return res.status(404).json({ message: 'No submitted reviews found.' });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Error fetching submitted reviews:', error);
    res.status(500).json({ error: 'Failed to fetch submitted reviews.' });
  }
};




module.exports = {
  submitReview,
  updateReview,
  getAssignedPapers,
  getSubmittedReviews,
};
