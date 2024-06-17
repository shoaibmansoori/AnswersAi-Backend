# AskGeniusApp

A Node.js RESTful API with Sequelize, PostgreSQL, and JWT Authentication.

## Table of Contents
1. [Introduction](#introduction)
2. [Setup Instructions](#setup-instructions)
3. [Running the Project](#running-the-project)
4. [Database Setup](#database-setup)
5. [Environment Variables](#environment-variables)
6. [Dependencies](#dependencies)
7. [Testing](#testing)
8. [Endpoints](#endpoints)
9. [Architecture](#architecture)

## Introduction

This project is a RESTful API built with Node.js, Express, and PostgreSQL, using Sequelize ORM for database interactions. It includes authentication and authorization using JWT tokens.

## Setup Instructions

### Prerequisites
1. Node.js (>=14.x)
2. PostgreSQL (>=12.x)

### Clone the Repository

```bash
git clone https://github.com/yourusername/AskGeniusApp.git
cd AskGeniusApp


Install Dependencies
npm install



Set Up Environment Variables
Create a .env file in the root directory and add the following


DATABASE_NAME=your_database_name
DATABASE_USERNAME=your_database_username
DATABASE_PASSWORD=your_database_password
DATABASE_HOST=your_database_host
JWT_SECRET=your_jwt_secret
HUGGING_FACE_API_KEY=your_hugging_face_api_key


Running the Project
Start the Server
npm start


Using Nodemon for Development
npm run dev


Database Setup
1 Install PostgreSQL

Download and install PostgreSQL from here.

2 Create Database

Use the PostgreSQL command line or a tool like pgAdmin to create a database.




Dependencies
Node.js
Express.js
Sequelize
PostgreSQL
bcryptjs
jsonwebtoken
dotenv
Joi
axios
Install all dependencies using:

npm install



Question Endpoints
POST /api/questions: Ask a new question
GET /api/questions/
: Retrieve specific question and answer
GET /api/users/
/questions: Retrieve all questions asked by a user
Auth Endpoints
POST /api/auth/login: User login endpoint
POST /api/auth/logout: User logout endpoint

