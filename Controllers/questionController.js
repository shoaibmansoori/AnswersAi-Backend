const questionService = require('../services/questionService');

// Create a new question
const askQuestion = async (req, res,next) => {
  const { content } = req.body;
  const userId = req.user.id;

  try {
    // Create a new question
    const question = await questionService.createQuestion(userId, content);

    // Ask question to AI and get response
    const botResponse = await questionService.getAIResponse(content);

    // Send response
    res.status(201).send({ botResponse,question });
  } catch (error) {
    console.error('Error creating question:', error);
    next(error);
  }
};

// Retrieve specific question and answer
const getQuestionById = async (req, res,next) => {
  try {
    // Get the question by ID from the database
    const question = await questionService.getQuestionById(req.params.questionId);

    // If question not found, throw NotFoundError
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Send the question as the response
    res.status(200).send({ question });
  } catch (error) {
    console.error('Error retrieving question:', error);
    next(error);
  }
};

// Retrieve all questions asked by a user
const getQuestionByUserId = async (req, res,next) => {
  try {
    // Get all questions by user ID from the database
    const questions = await questionService.getQuestionsByUserId(req.params.userId);

    // Send the questions as the response
    res.status(200).send(questions);
  } catch (error) {
    console.error('Error retrieving questions for user:', error);
    next(error);
  }
};

module.exports = { askQuestion, getQuestionById, getQuestionByUserId };
