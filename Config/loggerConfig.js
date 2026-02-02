const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

module.exports = createLogger({
    format: combine(
        label({ label: 'log' }),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.File({ filename: 'log/track.log', level: 'warn' }),
        new transports.File({ filename: 'log/error.log', level: 'error' }),
        new transports.File({ filename: 'log/combined.log', level: 'info' }),
    ]
})