const { generateToken } = require('../utility/jwt');
const userService = require('../services/userService');
const userSchema = require('../validations/userValidation');

// Create a new user
const createUser = async (req, res, next) => {
  // Validate request body
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Invalid request data', error: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    // Create a new user
    const user = await userService.createUser(email, password);

    // Generate JWT token for the user
    const payload = {
      id: user.id,
      email: user.email
    };
    const token = generateToken(payload);

    // Send response with user details and token
    res.status(201).json({ user, token });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Email already exists', error: error.message });
    }
    console.error('Error creating user:', error);
    next(error); // Pass the error to the default error handler
  }
};

// Get user by ID
const getUserById = async (req, res, next) => {
  try {

    const userId = req.params.userId

    // Retrieve user by ID
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user details as response
    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    next(error); // Pass the error to the default error handler
  }
};

module.exports = { createUser, getUserById };
