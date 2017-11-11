const {Wit, log} = require('node-wit');
const config = require('../config');
const logger = require('../logger');

let client; 

module.exports.initialize = () => {
  client = new Wit({
    accessToken: config.wit.accessToken,
    logger: new log.Logger(log.DEBUG)
  });
  logger.info('Initialized Wit API.');
}

module.exports.send = async (tweetText) => {
  client.message(tweetText)
  .then((x)=>{
    return x;
  });
}
