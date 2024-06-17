const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { generateToken, generateRefreshToken } = require('../jwt');

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Invalid email or password');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid email or password');

  const payload = { id: user.id, email: user.email };
  const token = generateToken(payload);
  return token;
};

const logoutUser = async () => {
  // Logic for logging out a user, e.g., invalidating a refresh token if applicable
  return 'Logged out successfully';
};

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new Error('Refresh token is required');
  const token = generateRefreshToken(refreshToken);
  return token;
};

module.exports = { loginUser, logoutUser, refreshAccessToken };
