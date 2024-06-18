require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const  questionRoute  = require('./routes/questionRoutes')
const  userRoute  = require('./routes/userRoutes')
const  authRoute  = require('./routes/authRoutes')


const app = express();
app.use(bodyParser.json());

// USER ROUTES
app.use('/api/user',userRoute);
// QUESTION ROUTES
app.use('/api/question',questionRoute);
// AUTH ROUTES
app.use('/api/auth',authRoute);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


if (require.main === module) {
  const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`listening on port ${PORT}`));
}

module.exports = app;