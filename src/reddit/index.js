const config = require('../config');
const logger = require('../logger');

const snoowrap = require('snoowrap');

let reddit;

module.exports.initialize = async () => {
  const _reddit = new snoowrap({
    userAgent: config.reddit.userAgent,
    clientId: config.reddit.clientId,
    clientSecret: config.reddit.clientSecret,
    username: config.reddit.username,
    password: config.reddit.password,
  });

  // Test and print success
  await _reddit.getHot();
  reddit = _reddit;
  logger.info('Connected to Reddit API.');
};
