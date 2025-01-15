const sequelize = require('./sequelize');
const User = require('../models/user');
const Conference = require('../models/conference');
const Paper = require('../models/paper');
const Review = require('../models/review');

const defineRelationships = () => {
  User.hasMany(Paper, { foreignKey: 'authorId', as: 'author' });
  Paper.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

  User.hasMany(Review, { foreignKey: 'reviewerId', as: 'reviewer' });
  Review.belongsTo(User, { foreignKey: 'reviewerId', as: 'reviewer' });

  Conference.hasMany(Paper, { foreignKey: 'conferenceId' });
  Paper.belongsTo(Conference, { foreignKey: 'conferenceId' });

  Paper.hasMany(Review, { foreignKey: 'paperId' });
  Review.belongsTo(Paper, { foreignKey: 'paperId' });
};

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    defineRelationships();

    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB, User, Conference, Paper, Review };
