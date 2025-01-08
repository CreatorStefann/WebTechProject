const Review = require('../models/review');
const Paper = require('../models/paper');
const User = require('../models/user');

// Submit a review
const submitReview = async (req, res) => {
  try {
    
    const { paperId, feedback, rating, status } = req.body;

    
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

    
    const review = await Review.create({
      paperId,
      reviewerId: 2, 
      feedback,
      rating,
      status
    });

    
    const reviews = await Review.findAll({ where: { paperId } });

    if (reviews.length >= 2) {
        
        const hasRejected = reviews.some((r) => r.status && r.status.includes('rejected'));

        
        const paperStatus = hasRejected ? 'rejected' : 'accepted';

        paper.status = paperStatus;
        await paper.save();
    }


    res.status(201).json({
      message: 'Review submitted successfully!',
      review,
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ error: 'An error occurred while submitting the review.' });
  }
};

module.exports = {
  submitReview,
};
