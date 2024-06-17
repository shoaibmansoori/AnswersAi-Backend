const Joi = require('joi');
const { generateToken } = require('../jwt');
const userService = require('../services/userService');

// Validation schemas
const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Create a new user
const createUser = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  try {
    const user = await userService.createUser(email, password);
    const payload = {
      id: user.id,
      user: user.email
    };
    const token = generateToken(payload);
    res.status(201).send({ user, token });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).send('Email already exists');
    }
    next(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;

    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (error) {
    return res.status(403).send('error', error);
  }
};

module.exports = { createUser, getUserById };
