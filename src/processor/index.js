const logger = require('../logger');
const wit = require('../node-wit'); 

module.exports.process = (tweet) => {
  if (tweet.verified) {
    classifyVerified(tweet);
  }
  else {
    classifyVerified(tweet);
  }
};

function classifyVerified(tweet) {
  console.log(tweet.content); 
}