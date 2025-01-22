const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, sequelize } = require('./config/db');
const User = require('./models/user');
const Conference = require('./models/conference');
const Paper = require('./models/paper');
const Review = require('./models/review');
const conferenceRoutes = require('./routes/conferences');
const paperRoutes = require('./routes/papers');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://final-project-webtech.azurewebsites.net' 
    : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/conferences', conferenceRoutes);
app.use('/api/papers', paperRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);
app.use('/api/authRoutes', authRoutes);

(async () => {
  await connectDB();
  await sequelize.sync({ alter: false });
})();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../wwwroot/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../wwwroot/build', 'index.html'));
  });
}

app.get('/', (req, res) => {
  res.send('Welcome to the conference app!');
});

module.exports = app;
