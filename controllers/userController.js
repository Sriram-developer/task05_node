// controllers/userController.js
const User  = require('../models/user');

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) throw new Error('User not found');
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const [updatedRows] = await User.update(
      { username, email, password },
      { where: { id: req.params.id } }
    );
    if (updatedRows === 0) throw new Error('User not found');
    const updatedUser = await User.findByPk(req.params.id);
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedRowCount = await User.destroy({
      where: { id: req.params.id }
    });
    if (deletedRowCount === 0) throw new Error('User not found');
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
