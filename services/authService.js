const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { generateToken, generateRefreshToken } = require('../jwt');


// Function to handle user login
const loginUser = async (email, password) => {
  // Retrieve the user from the database using the provided email
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid email or password');

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid email or password');

  // Generate a JWT token with the user's id and email as payload
  const payload = { id: user.id, email: user.email };
  const token = generateToken(payload);
  return token;
};


// Function to handle user logout
const logoutUser = async () => {
  // Logic for logging out a user, e.g., invalidating a refresh token if applicable
  // Currently, this is a placeholder function that always returns a success message
  return 'Logged out successfully';
};


// Function to refresh the access token
const refreshAccessToken = async (refreshToken) => {
  // Check if the refresh token is provided
  if (!refreshToken) throw new Error('Refresh token is required');

  // Generate a new access token using the provided refresh token
  const token = generateRefreshToken(refreshToken);
  return token;
};

// Export the functions to be used in other parts of the application
module.exports = { loginUser, logoutUser, refreshAccessToken };
