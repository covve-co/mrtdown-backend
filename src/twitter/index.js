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

module.exports.pingSMRTStatus = () => {
};

module.exports.beginStream = (cb) => {
  const keywords = config.twitter.keywords.join();
  const stream = twitter.stream('statuses/filter', {track: keywords + ' -filter:retweets'});
  stream.on('data', function(event) {
    if (!event.text.startsWith('RT')) {
      cb(event.text);
    }
  });
  stream.on('error', function(err) {
    logger.debug(err);
  });
};
