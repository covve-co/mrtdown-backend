const config = require('../config');
const logger = require('../logger');

const Twitter = require('twitter');

let twitter;

module.exports.initialize = async () => {
  const _twitter = new Twitter({
    consumer_key: config.twitter.consumerKey,
    consumer_secret: config.twitter.consumerSecret,
    access_token_key: config.twitter.accessTokenKey,
    access_token_secret: config.twitter.accessTokenSecret,
  });

  // Test and print success
  await _twitter.get('statuses/user_timeline', {screen_name: 'covveco'});
  twitter = _twitter;
  logger.info('Connected to Twitter API.');
};
