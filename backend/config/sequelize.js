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
    // dialectOptions: {
    //   encrypt: true, 
    // },
    logging: false, 
  }
);

console.log('DB Config:', {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = sequelize;
