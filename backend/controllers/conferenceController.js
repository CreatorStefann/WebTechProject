const Sequelize = require('sequelize'); 
const User = require('../models/user');
const Conference = require('../models/conference');
const Paper = require('../models/paper');
const Review = require('../models/review');


const createConference = async (req, res) => {
  try {
    const role = 'organizer'; 
    if (role !== 'organizer') {
      return res.status(403).json({ error: 'Access denied. Only organizers can create conferences.' });
    }

    const { title, startDate, endDate } = req.body;

    if (!title || !startDate || !endDate) {
      return res.status(400).json({ error: 'Title, startDate, and endDate are required.' });
    }

    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ error: 'Start date must be earlier than end date.' });
    }

    const conference = await Conference.create({ title, startDate, endDate });

    res.status(201).json({
      message: 'Conference created successfully!',
      conference,
    });
  } catch (error) {
    console.error('Error creating conference:', error);
    res.status(500).json({ error: 'An error occurred while creating the conference.' });
  }
};

const assignReviewersToPaper = async (paperId) => {
  try {
    const reviewers = await User.findAll({
      where: { role: 'reviewer' },
      order: Sequelize.literal('RAND()'),
      limit: 2,
    });

    if (reviewers.length < 2) {
      throw new Error('Not enough reviewers available to assign.');
    }

    for (const reviewer of reviewers) {
      await Review.create({
        paperId,
        reviewerId: reviewer.id,
        feedback: null, 
        rating: null,   
        status: 'pending', 
      });
    }

    console.log(`Reviewers assigned successfully to paper ID: ${paperId}`);
  } catch (error) {
    console.error(`Error assigning reviewers to paper ID ${paperId}:`, error);
    throw error;
  }
};

const listConferences = async (req, res) => {
  try {
    const conferences = await Conference.findAll();

    res.status(200).json({
      message: 'Conferences retrieved successfully!',
      conferences,
    });
  } catch (error) {
    console.error('Error listing conferences:', error);
    res.status(500).json({ error: 'An error occurred while fetching conferences.' });
  }
};

module.exports = {
  createConference,
  assignReviewersToPaper,
  listConferences,
};
