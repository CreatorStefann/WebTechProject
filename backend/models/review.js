const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Review = sequelize.define('Review', {
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5,
    },
  },
  status: {
    type: DataTypes.ENUM('accepted', 'rejected'),
    allowNull: false,
  }
});

module.exports = Review;
