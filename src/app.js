require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const authRouter = require('./auth/auth-router');
const logger = require('./utils/logger');

const app = express();

app.use(helmet());
app.use(cors());


app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
      console.error(error)
      response = { message: error.message, error }
    }
  res.status(500).json(response)
 })

module.exports = app;
