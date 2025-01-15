const express = require('express');
const cors = require('cors');
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

const app = express();

const corsOptions = {
  origin: 'http://localhost:3001',
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
  await sequelize.sync({ alter: true });
})();

app.get('/', (req, res) => {
  res.send('Welcome to the conference app!');
});

module.exports = app;
