const db_mock = require('../../mock/db-mock');
const axios = require('axios');
const logger = require('../utils/logger');

const { AUTH_REQUEST_URL, DEV_API_KEY, ZEK_API_URL } = process.env;

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
            validationObject.error = "User not found";
            return validationObject;
        }

        validationObject.foundUser = true;
        logger.debug(`Auth Service found user: ${userName}`);

        if(getUser.password !== password) {
            validationObject.error = `Incorrect password for user: ${userName}`;
            return validationObject;
        }

        validationObject.correctPassword = true;
        logger.debug(`Auth Service validated password for user: ${userName}`);

        return validationObject;
    },

    authRequest() {
        axios.get(AUTH_REQUEST_URL, {
            params: {
                client_id: DEV_API_KEY,
                redirect_uri: `${ZEK_API_URL}/api/auth/auth-request`,
                response_type: 'code',
                scope: 'full'
            }
        })
        return;
    }
}

module.exports = AuthService