const { Question } = require('../models');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
require('dotenv').config();
// const apiKey = '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'; // Replace with your Hugging Face API key
// const modelEndpoint = 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill';
const apiKey = process.env.AI_KEY;
const modelEndpoint = process.env.AI_MODEL_ENDPOINT;
const createQuestion = async (userId, content) => {
  const question = await Question.create({ id: uuidv4(), user_id: userId, content });
  return question;
};

const getAIResponse = async (content) => {
  const response = await axios.post(modelEndpoint, {
    inputs: content
  }, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });
  const botResponse = response.data[0]?.generated_text || '';
  return botResponse;
};

const getQuestionById = async (questionId) => {
  const question = await Question.findByPk(questionId);
  return question;
};

const getQuestionsByUserId = async (userId) => {
  const questions = await Question.findAll({
    where: { user_id: userId }
  });
  return questions;
};

module.exports = { createQuestion, getAIResponse, getQuestionById, getQuestionsByUserId };
