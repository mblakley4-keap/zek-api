const pino = require('pino');

const logger = pino({
    prettyPrint: {
        level: process.env.LOG_LEVEL,
        colorize: true,
        ignore: 'hostname,pid',
        translateTime: 'SYS:standard'
    }
});

module.exports = logger;