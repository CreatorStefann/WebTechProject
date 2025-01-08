const sequelize = require('./sequelize');
const User = require('../models/user');
const Conference = require('../models/conference');
const Paper = require('../models/paper');
const Review = require('../models/review');

// Define relationships
const defineRelationships = () => {
  User.hasMany(Paper, { foreignKey: 'authorId' });
  Paper.belongsTo(User, { foreignKey: 'authorId' });

  Conference.hasMany(Paper, { foreignKey: 'conferenceId' });
  Paper.belongsTo(Conference, { foreignKey: 'conferenceId' });

  Paper.hasMany(Review, { foreignKey: 'paperId' });
  Review.belongsTo(Paper, { foreignKey: 'paperId' });

  User.hasMany(Review, { foreignKey: 'reviewerId' });
  Review.belongsTo(User, { foreignKey: 'reviewerId' });
};

// Connect to the database and sync models
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    // Define relationships before syncing
    defineRelationships();

    // Sync models
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit process on failure
  }
};

module.exports = { sequelize, connectDB, User, Conference, Paper, Review };
