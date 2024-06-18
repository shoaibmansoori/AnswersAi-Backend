const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { User } = require('../models');

// Function to create a new user in the database
const createUser = async (email, password) => {
  // Hash the user's password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Generate a unique ID for the user and create a new user record in the database
  const user = await User.create({ id: uuidv4(), email, password: hashedPassword });
  return user;
};


// Function to retrieve a user by their ID from the database
const getUserById = async (userId) => {
  // Find the user by their primary key (ID) and exclude the password attribute from the result
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] }
  });
  return user;
};

// Export the functions to be used in other parts of the application
module.exports = { createUser, getUserById };
