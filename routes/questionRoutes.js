const express = require('express')
const {askQuestion, getQuestionById } = require('../Controllers/questionController')
const {jwtAuthMiddleware} = require('../jwt')
const routes = express.Router();

routes.post('/', jwtAuthMiddleware, askQuestion);
routes.get('/:questionId', getQuestionById);

module.exports =  routes;
