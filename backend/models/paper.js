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
    type: DataTypes.ENUM('under review', 'accepted', 'rejected'),
    allowNull: false,
    defaultValue: 'under review',
  },
});

module.exports = Paper;
