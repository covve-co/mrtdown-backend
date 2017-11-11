const config = require('../config');
const logger = require('../logger');

const Twitter = require('twitter');
const data = require('./data');
let twitter;

const processor = require('../processor');

module.exports.initialize = () => {
  twitter = new Twitter({
    consumer_key: config.twitter.consumerKey,
    consumer_secret: config.twitter.consumerSecret,
    access_token_key: config.twitter.accessTokenKey,
    access_token_secret: config.twitter.accessTokenSecret,
  });
  logger.info('Initialized Twitter API.');
};

module.exports.startStreaming = () => {
  const keywords = config.twitter.keywords.join();
  const stream = twitter.stream('statuses/filter', {track: keywords});
  consumeStream(stream, module.exports.startStreaming);
};

module.exports.startStreamingVerified = () => {
  const stream = twitter.stream('statuses/filter', {follow: config.twitter.verifiedUsername});
  consumeStream(stream, module.exports.startStreamingVerified);
};

const consumeStream = (stream, restart) => {
  stream.on('data', function(event) {
    // Ensure event isn't a retweet
    if (!event.text.startsWith('RT') && !event.in_reply_to_status_id) {
      const tweet = data.extract(event);
      processor.process(tweet);
    }
  });

  stream.on('error', function(err) {
    logger.debug('Twitter stream error: ', err);
  });

  stream.on('end', function() {
    setTimeout(function() {
      restart();
    }, 1000);
  });
}
