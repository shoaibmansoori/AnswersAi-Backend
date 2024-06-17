require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const rateLimit = require('express-rate-limit');
const {sequelize} = require('./models')
const  questionRoute  = require('./routes/questionRoutes')
const  userRoute  = require('./routes/userRoutes')
const  authRoute  = require('./routes/authRoutes')


const app = express();
app.use(bodyParser.json());
app.use('/api/question',questionRoute);
app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limit each IP to 100 requests per windowMs
// });

// app.use(limiter);



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});


module.exports = app;