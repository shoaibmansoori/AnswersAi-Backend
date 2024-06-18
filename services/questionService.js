const { Question } = require('../models');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
require('dotenv').config();

// Load API key and model endpoint from environment variables
const apiKey = process.env.HUGGING_FACE_API_KEY;
const modelEndpoint = process.env.HUGGING_FACE_AI_MODEL_ENDPOINT;


// Function to create a new question in the database
const createQuestion = async (userId, content) => {
  // Generate a unique ID for the question and store it in the database
  const question = await Question.create({ id: uuidv4(), user_id: userId, content });
  return question;
};


// Function to get a response from the AI model
const getAIResponse = async (content) => {
  // Make a POST request to the AI model endpoint with the question content
  const response = await axios.post(modelEndpoint, {
    inputs: content
  }, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });

  // Extract the generated response text from the AI model response
  const botResponse = response.data[0]?.generated_text || '';
  return botResponse;
};


// Function to retrieve a question by its ID from the database
const getQuestionById = async (questionId) => {
  const question = await Question.findByPk(questionId);
  return question;
};


// Function to retrieve all questions for a specific user from the database
const getQuestionsByUserId = async (userId) => {
  const questions = await Question.findAll({
    where: { user_id: userId }
  });
  return questions;
};

// Export the functions to be used in other parts of the application
module.exports = { createQuestion, getAIResponse, getQuestionById, getQuestionsByUserId };
