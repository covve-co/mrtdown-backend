const config = require('../config');
const logger = require('../logger');

const admin = require('firebase-admin');
const store = require('./store');

let app;

module.exports.intialize = () => {
  return new Promise((resolve, reject) => {
    _app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: config.firebase.projectId,
        clientEmail: config.firebase.clientEmail,
        privateKey: config.firebase.privateKey,
      }),
      databaseURL: config.firebase.databaseUrl,
    });

    // Print success
    _app.database().ref().once('value', function(data) {
      const val = data.val();
      if (val !== null) {
        logger.info('Connected to Firebase.');
        app = _app;
        store._setState(val);
        resolve();
      } else {
        reject(new Error('Failed to connect to Firebase.'))
      }
    });
  });
};

module.exports._app = () => app;
