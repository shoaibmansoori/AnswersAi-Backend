const { HTTP_STATUS_CODE, MESSAGE } = require('../constant/constant');
const questionService = require('../services/questionService');

// Create a new question
const askQuestion = async (req, res,next) => {
  const { content } = req.body;
  const userId = req.user?.id;

  try {
    // Create a new question
    const question = await questionService.createQuestion(userId, content);

    // Ask question to AI and get response
    const botResponse = await questionService.getAIResponse(content);

    // Send response
    res.status(HTTP_STATUS_CODE?.Ok).send({ botResponse,question });
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
      return res.status(HTTP_STATUS_CODE?.Not_Found).json({ message: MESSAGE?.Question_Not_Found });
    }

    // Send the question as the response
    res.status(HTTP_STATUS_CODE?.Ok).send({ question });
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
    res.status(HTTP_STATUS_CODE?.Ok).send(questions);
  } catch (error) {
    console.error('Error retrieving questions for user:', error);
    next(error);
  }
};

module.exports = { askQuestion, getQuestionById, getQuestionByUserId };
