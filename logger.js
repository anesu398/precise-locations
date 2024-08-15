const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'app.log');

/**
 * Log an informational message.
 * @param {string} message - The message to log.
 */
function logInfo(message) {
    log('INFO', message);
}

/**
 * Log an error message.
 * @param {string} message - The message to log.
 */
function logError(message) {
    log('ERROR', message);
}

/**
 * Generic logging function to write logs to a file.
 * @param {string} level - The level of the log ('INFO' or 'ERROR').
 * @param {string} message - The message to log.
 */
function log(level, message) {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} [${level}] ${message}\n`;
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
}

module.exports = {
    logInfo,
    logError
};
