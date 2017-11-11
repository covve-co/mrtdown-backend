const config = require('../config');
const logger = require('../logger');

const gcm = require('node-gcm');
let sender;

module.exports.intialize = () => {
  sender = new gcm.Sender(config.firebase.serverKey);
  logger.info('Initialized Firebase.');
};

module.exports.notify = (shortName) => {
  const message = new gcm.Message({
    notification: {
      title: 'MRT Down!',
      body: `New update to ${shortName}!`,
    },
  });
  sender.send(message, {topic: shortName}, (err, res) => {
    if (err) {
      logger.debug('Error sending notifications :(', err);
    } else {
      logger.debug('Sent notifications!', {});
    }
  });
};
