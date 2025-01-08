const Conference = require('../models/conference');
const { User } = require('../config/db');

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
  listConferences,
};
