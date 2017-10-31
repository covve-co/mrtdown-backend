const config = require('../config');

module.exports.extract = (event) => {
  return {
    source: 'twitter',
    author: event.user.screen_name,
    verified: event.user.screen_name == config.twitter.verifiedUsername,
    content: event.text,
    retweets: event.retweet_count,
    replies: event.reply_count,
    quotes: event.quote_count,
  };
};
