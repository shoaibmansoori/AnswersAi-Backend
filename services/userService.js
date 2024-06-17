const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { User } = require('../models');

const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ id: uuidv4(), email, password: hashedPassword });
  return user;
};

const getUserById = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] }
  });
  return user;
};

module.exports = { createUser, getUserById };
