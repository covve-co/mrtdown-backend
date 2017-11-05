const config = require('../config');
const logger = require('../logger');

const snoowrap = require('snoowrap');
let reddit;

module.exports.initialize = () => {
  reddit = new snoowrap({
    userAgent: config.reddit.userAgent,
    clientId: config.reddit.clientId,
    clientSecret: config.reddit.clientSecret,
    username: config.reddit.username,
    password: config.reddit.password,
  });
  logger.info('Initialized Reddit API.');
};

const poll = () => {
  // logger.debug('Polling!');
};

module.exports.startPolling = () => {
  setInterval(poll, config.reddit.pollInterval);
};
