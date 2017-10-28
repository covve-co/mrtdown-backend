const secrets = require('./development.secrets');

module.exports = {
  port: 3000,
  host: 'locahost:3000',
  logLevel: 'debug',
  firebase: {
    projectId: secrets.firebase.projectId,
    clientEmail: secrets.firebase.clientEmail,
    privateKey: secrets.firebase.privateKey,
    databaseUrl: secrets.firebase.databaseUrl
  },
  twitter: {
    consumerKey: secrets.twitter.consumerKey,
    consumerSecret: secrets.twitter.consumerSecret,
    accessTokenKey: secrets.twitter.accessTokenKey,
    accessTokenSecret: secrets.twitter.accessTokenSecret,
  }
};
