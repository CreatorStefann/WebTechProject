const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Conference = sequelize.define('Conference', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Conference;
