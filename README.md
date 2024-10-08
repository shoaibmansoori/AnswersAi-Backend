# AskBuddyApp

AskBuddyApp is an AI-powered tool that allows users to ask any question and receive intelligent responses. Built with Node.js, Sequelize, PostgreSQL, and JWT Authentication, this RESTful API leverages advanced AI models to provide accurate and insightful answers.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Running the Project](#running-the-project)
3. [Endpoints](#endpoints)
4. [Environment Variables](#environment-variables)
5. [Database Setup](#database-setup)
6. [Dependencies](#dependencies)
7. [Testing](#testing)




## Setup Instructions

### Prerequisites
1. Node.js (>=14.x)
2. PostgreSQL (>=12.x)

### Clone the Repository

git clone https://github.com/shoaibmansoori/SHOAIB-MANSOORI-AnswersAi-Backend.git


### Running the Project

1. Install dependencies:
   npm install

2. Run the project:
   npm start

3. For development, you can use nodemon to automatically restart the server on changes:
   npm start dev



### Endpoints

**User Endpoints**
- **POST /api/users:** Create a new user.
- **GET /api/users/:userId:** Retrieve user profile.

**Question Endpoints**
- **POST /api/questions:** Ask a new question.
- **GET /api/questions/:questionId:** Retrieve specific question and answer.
- **GET /api/users/:userId/questions:** Retrieve all questions asked by a user.

**Auth Endpoints**
- **POST /api/auth/login:** User login endpoint.
- **POST /api/auth/logout:** User logout endpoint.
- **POST /api/auth/refresh:** Refresh access token endpoint.



### Environment Variables

- **DATABASE_NAME**: your_database_name
- **DATABASE_USERNAME**: your_database_username
- **DATABASE_PASSWORD**: your_database_password
- **DATABASE_HOST**: your_database_host
- **JWT_SECRET**: your_jwt_secret
- **REFRESH_TOKEN_SECRET**: your_hugging_face_api_key
- **HUGGING_FACE_API_KEY**: your_hugging_face_api_key
- **HUGGING_FACE_AI_MODEL_ENDPOINT**: your_hugging_face_api_key




### Database Setup
1. Install PostgreSQL

2. Create Database

   Use the PostgreSQL command line or a tool like pgAdmin to create a database.

   CREATE DATABASE your_database_name;


### Dependencies

- **Node.js**
- **Express.js**
- **Sequelize**
- **PostgreSQL**
- **bcryptjs**
- **jsonwebtoken**
- **dotenv**
- **Joi**
- **axios**   



### Testing

   Set Up Testing Environment
- **Create a test database:**

   CREATE DATABASE your_test_database_name;

   Update your .env file with test database credentials.

- **Run Tests**
   npm test








