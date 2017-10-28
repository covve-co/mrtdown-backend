const config = require('../config');
const logger = require('../logger');

const gcm = require('node-gcm');
let sender;

module.exports.intialize = () => {
  sender = new gcm.Sender(config.firebase.serverKey);
  logger.info('Initialized Firebase.');
};
