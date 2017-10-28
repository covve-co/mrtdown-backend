const config = require('../config');
const logger = require('../logger');

const Twitter = require('twitter');
let twitter;

module.exports.initialize = () => {
  twitter = new Twitter({
    consumer_key: config.twitter.consumerKey,
    consumer_secret: config.twitter.consumerSecret,
    access_token_key: config.twitter.accessTokenKey,
    access_token_secret: config.twitter.accessTokenSecret,
  });
  logger.info('Initialized Twitter API.');
};
