const questionService = require('../services/questionService');

// Create a new question
const askQuestion = async (req, res, next) => {
  const { content } = req.body;
  const userId = req.user.id

  try {
    const question = await questionService.createQuestion(userId, content);
    const botResponse = await questionService.getAIResponse(content);
    res.status(201).send({ question, botResponse });
  } catch (error) {
    next(error);
  }
};

// Retrieve specific question and answer
const getQuestionById = async (req, res, next) => {
  try {
    const question = await questionService.getQuestionById(req.params.questionId);
    if (!question) {
      return res.status(404).send('Question not found');
    }
    res.send({ question });
  } catch (error) {
    next(error);
  }
};

// Retrieve all questions asked by a user
const getQuestionByUserId = async (req, res, next) => {
  try {
    const questions = await questionService.getQuestionsByUserId(req.params.userId);
    res.send(questions);
  } catch (error) {
    next(error);
  }
};

module.exports = { askQuestion, getQuestionById, getQuestionByUserId };
