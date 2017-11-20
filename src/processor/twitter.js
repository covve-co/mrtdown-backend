const logger = require('../logger');
const wit = require('../node-wit');
const sentiment = require('sentiment');
const lines = require('../mongodb/lines');
const statusDb = require('../mongodb/status');
const posts = require('../mongodb/posts');
const firebase = require('../firebase');

const twitterProcessor = require('./twitter');


module.exports = (tweet) => {
  if (tweet.verified) {
    console.log(`VERIFIED: ${tweet.content}`)
    classifyVerified(tweet);
  }
  else {
    console.log(tweet.content);
    classifyUnverified(tweet);
  }
};

async function classifyVerified(tweet) {
  try {
    // Legit breakdown
    const res = await wit.send(tweet.content)
    let line;
    console.log(res);
    const entities = res.entities;
    // Not doing duration lmao
    // const duration = (entities.duration.minute) ? res.entities.duration.minute:'Unspecified';
    delete entities.duration;
    line.shortName = entities.keys[0];
    line.level = (line.level) ? 1: line.level + 1;
    const status = entities[line].value;

    if (status == 'Cleared') {
      // Clear line status
      await statusDb.clear(line.shortName);
    }
    else {
      await lines.insert(line);
      const line = lines.fetchLatest(line.shortName);
      await statusDb.update(line.shortName, line._id);
      firebase.notify(line.shortName);
    }
  } catch (err) {
    logger.info(err);
  }
};

function classifyUnverified(tweet) {
  // Analyse tweet sentiment
  const tweet_sentiment = sentiment(tweet.content)
  if (tweet_sentiment.score < 0 | 'delay' in tweet_sentiment.tokens) {
    posts.insert(tweet);
  }
};