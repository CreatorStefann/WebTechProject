const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Paper = sequelize.define('Paper', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  abstract: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  status: {
    type: DataTypes.ENUM('submitted', 'under review', 'feedback given', 'accepted', 'rejected'),
    allowNull: false,
    defaultValue: 'submitted',
  },
});

module.exports = Paper;
