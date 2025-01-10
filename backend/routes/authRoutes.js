const express = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    check('username').notEmpty().withMessage('Username is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  register
);

router.post(
  '/login',
  [
    check('username').notEmpty().withMessage('Valid email is required'),
    check('password').notEmpty().withMessage('Password is required'),
  ],
  login
);

router.get('/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'You have access to this protected route!', user: req.user });
});

module.exports = router;
