const User = require('../models/user');

const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ error: 'Username, password, and role are required.' });
    }

    const validRoles = ['organizer', 'reviewer', 'author'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: `Role must be one of the following: ${validRoles.join(', ')}.` });
    }

    const user = await User.create({ username, password, role });

    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering the user.' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'role', 'createdAt'],
    });

    res.status(200).json({
      message: 'Users retrieved successfully!',
      users,
    });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'An error occurred while retrieving users.' });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
};
