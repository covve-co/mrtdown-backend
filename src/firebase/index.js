const config = require('../config');

const logger = require('../logger');

const admin = require('firebase-admin');
const serviceAccount = require('./' + config.firebase.keyFile);

let app;

module.exports.intialize = () => {
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.firebase.databaseUrl,
  });

  // Print success.
  app.database().ref();
  logger.info('Connected to Firebase.');
};
