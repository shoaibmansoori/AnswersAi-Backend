const express = require('express')
const {loginUser,logoutUser,refreshAccessToken }  = require('../Controllers/authController')

const routes = express.Router();

routes.post('/login',loginUser);
routes.post('/logout',logoutUser);
routes.post('/refresh',refreshAccessToken);


module.exports =  routes;