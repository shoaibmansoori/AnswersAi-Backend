// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'postgres',
});

const User = require('./user')(sequelize, DataTypes);
const Question = require('./question')(sequelize, DataTypes);

sequelize.sync(); // Sync models with the database
module.exports = {
  sequelize,
  User,
  Question,
};
