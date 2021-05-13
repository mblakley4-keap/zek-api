const express = require('express');
const { validateLoginCreds, authRequest } = require('./auth-service');
const logger = require('../utils/logger');

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter
    .post('/login', jsonBodyParser, (req, res, next) => {
        const { userName, password } = req.body;
        const loginCreds = { userName, password };

        for (const [key, value] of Object.entries(loginCreds)) {
            if (value == null) {
                return res.status(400).json({ error: `Missing ${key} in request body`})
            }
        }

        const validatedUser = validateLoginCreds(loginCreds);

        if (!validatedUser.foundUser) {
            logger.info(`Did not find user: ${userName}`);
            return res.status(404).json({ message: validatedUser.error });
        }
        if (!validatedUser.correctPassword) {
            logger.info(`Incorrect password for user: ${userName}`);
            return res.status(400).json({ message: validatedUser.error });
        }

        logger.info(`User login credentials validated for ${userName}`);
        
        res.status(200).json({ message: 'login successful' });
    })

module.exports = authRouter