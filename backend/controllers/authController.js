const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


const register = async (req, res) => {
  try {
    console.log('Register request body:', req.body);
    const { username, password, role } = req.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists. Please choose a different username.' });
    }

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      role: role || 'author',
    });

    res.status(201).json({ message: 'User registered successfully', user: { username: user.username, role: user.role } });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }
  
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Error logging in' });
    }
  };
  
module.exports = { register, login };

