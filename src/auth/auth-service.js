const db_mock = require('../../mock/db-mock');
const logger = require('../utils/logger');

const AuthService = {
    validateLoginCreds(loginCreds) {
        const { userName, password } = loginCreds;
        const validationObject = {
            foundUser: false,
            correctPassword: false,
            error: null
        };

        const getUser = db_mock.users.find(x => userName === x.userName);
        
        if(!getUser) {
            return validationObject.error = "User not found";
        }

        validationObject.foundUser = true;
        logger.debug(`Auth Service found user: ${userName}`);

        if(getUser.password !== password) {
            return validationObject.error = `Incorrect password for user: ${userName}`;
        }

        validationObject.correctPassword = true;
        logger.debug(`Auth Service validated password for user: ${userName}`);

        return validationObject;
    }
}

module.exports = AuthService