const config = require('../config');
const logger = require('../logger');

const nodemailer = require('nodemailer');
let mailer;

module.exports.initialize = () => {
  mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  });
  logger.info('Initialized Mailer.');
};

module.exports.send = (data) => {
  const options = {
    from: config.email.user,
    to: config.email.recipients.join(),
    subject: `Line ${data.line} has level ${data.level}`,
    text: `Line ${data.line} has level ${data.level}`,
  };
  mailer.sendMail(options, function(err, info) {
    if (err) {
      logger.debug('Error sending email!', err);
    } else {
      logger.debug('Email sent!', info);
    }
  });
};
