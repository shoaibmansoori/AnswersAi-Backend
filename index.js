require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const  questionRoute  = require('./routes/questionRoutes')
const  userRoute  = require('./routes/userRoutes')
const  authRoute  = require('./routes/authRoutes');
const { HTTP_STATUS_CODE, MESSAGE } = require('./constant/constant');


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
  res.status(HTTP_STATUS_CODE?.Internal_Server_Error).send(MESSAGE?.Some_Thing_Went_wrong);
});


if (require.main === module) {
  const PORT = process.env.PORT || 7201;
app.listen(PORT, console.log(`listening on port ${PORT}`));
}

module.exports = app;