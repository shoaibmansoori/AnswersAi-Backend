const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { generateToken, generateRefreshToken } = require('../utility/jwt');


// Login a user
const loginUser = async (req, res,next) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send('User Not Found');
    }

    // Compare provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).send('Invalid email or password');
    }

    // Generate JWT token
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = generateToken(payload);

    // Return token as response
    res.json({ token });
  } catch (error) {
    console.error('Error logging in user:', error.message);
    next(error)
  }
};


// Logout a user
const logoutUser = async (req, res,next) => {
  // Logout is typically handled on the client by removing the token
  res.status(200).send('Logged out successfully');
};


// Refresh access token
const refreshAccessToken = async (req, res,next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(403).json({ message: 'Refresh token is required' });
  }

  try {
    // Generate new access token
    const token = generateRefreshToken(refreshToken);

    // Return new token as response
    res.send({ token });
  } catch (error) {
    console.error('Error refreshing access token:', error.message);
    next(error);
  }
};

module.exports = { loginUser, logoutUser, refreshAccessToken };
