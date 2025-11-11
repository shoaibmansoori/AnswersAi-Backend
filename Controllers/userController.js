const { generateToken } = require('../utility/jwt');
const userService = require('../services/userService');
const userSchema = require('../validations/userValidation');
const { HTTP_STATUS_CODE, MESSAGE } = require('../constant/constant');

// Create a new user
const createUser = async (req, res, next) => {
  // Validate request body
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(HTTP_STATUS_CODE?.Bad_Request).json({ message: MESSAGE?.Invalid_Data, error: error.details[0].message });
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
    res.status(HTTP_STATUS_CODE?.Created).json({ user, token });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(HTTP_STATUS_CODE?.Bad_Request).json({ message: MESSAGE?.Email_Already_Exist, error: error.message });
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
      return res.status(HTTP_STATUS_CODE?.Not_Found).json({ message: MESSAGE?.User_Not_found });
    }

    // Send user details as response
    res.status(HTTP_STATUS_CODE?.Ok).json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    next(error); // Pass the error to the default error handler
  }
};

module.exports = { createUser, getUserById };
