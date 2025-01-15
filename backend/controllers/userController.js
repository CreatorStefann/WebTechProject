const User = require('../models/user');

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
  getAllUsers,
};
