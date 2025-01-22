require('dotenv').config({ path: '../../.env' });;
const { Sequelize } = require('sequelize');



const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql', 
    dialectOptions: {
      encrypt: true, 
    },
    logging: false, 
  }
);

module.exports = sequelize;
