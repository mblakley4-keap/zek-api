const express = require('express');
const logger = require('../utils/logger');

const authRouter = express.Router();
const jsonBodyParser = express.json();

logger.info('running auth');

authRouter
    .post('/login', jsonBodyParser, (req, res, next) => {
        logger.info("nothing yet");
        res.status(401).send('still working');
    })

authRouter
    .route('/test')
    .get((req, res, next) => {
        logger.info('making it here');
        res.send('checking response');
    })

module.exports = authRouter