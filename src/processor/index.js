const logger = require('../logger');
const wit = require('../node-wit'); 
const sentiment = require('sentiment');
const lines = require('../mongodb/lines')

module.exports.process = (tweet) => {
  console.log(tweet.content, sentiment(tweet.content).score);
  
};

function classifyVerified(tweet) {
  // Legit breakdown
  wit.send(tweet.content)
  .then((res) => {
    let line;
    const entities = res.entities;
    // Not doing duration lmao
    // const duration = (entities.duration.minute) ? res.entities.duration.minute:'Unspecified';
    delete entities.duration;
    line.shortName = entities.keys[0];
    line.level = (line.level) ? 1: line.level + 1;
    const status = entities[line].value;

    if (status == 'Cleared') {
      // Clear line status
      
    }
    else {
      lines.insert(line);
    }
  
  })
};

function classifyUnverified(tweet) {
  // Analyse tweet sentiment
  const tweet_sentiment = sentiment(tweet.content)
  if (tweet_sentiment.score < 0 | 'delay' in tweet_sentiment.tokens) {

  }
};