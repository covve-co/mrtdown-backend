const config = require('../config');
const logger = require('../logger');

const admin = require('firebase-admin');

let app;

module.exports.intialize = () => {
  app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.firebase.projectId,
      clientEmail: config.firebase.clientEmail,
      privateKey: config.firebase.privateKey,
    }),
    databaseURL: config.firebase.databaseUrl,
  });

  // Print success
  app.database().ref().once('value', function(data) {
    if (data !== null) logger.info('Connected to Firebase.');
  });
};
