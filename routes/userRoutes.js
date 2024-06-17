const express = require('express')
const {createUser, getUserById }  = require('../Controllers/userController')
const {getQuestionByUserId } = require('../Controllers/questionController')


const routes = express.Router();


routes.post('/',createUser);
routes.get('/:userId', getUserById,);
routes.get('/:userId/questions',  getQuestionByUserId);


module.exports =  routes;