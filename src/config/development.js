const secrets = require('./development.secrets');

module.exports = {
  port: 3000,
  host: 'locahost:3000',

  logLevel: 'debug',

  firebase: {
    projectId: secrets.firebase.projectId,
    clientEmail: secrets.firebase.clientEmail,
    privateKey: secrets.firebase.privateKey,
    databaseUrl: secrets.firebase.databaseUrl,
    updateInterval: 300,
  },

  reddit: {
    userAgent: 'MRTDownBot',
    clientId: secrets.reddit.clientId,
    clientSecret: secrets.reddit.clientSecret,
    username: secrets.reddit.username,
    password: secrets.reddit.password,
  },

  twitter: {
    consumerKey: secrets.twitter.consumerKey,
    consumerSecret: secrets.twitter.consumerSecret,
    accessTokenKey: secrets.twitter.accessTokenKey,
    accessTokenSecret: secrets.twitter.accessTokenSecret,
  },

  lineNames: {
    EWL: 'East-West Line',
    NSL: 'North-South Line',
    CCL: 'Circle Line',
    NEL: 'North-East Line',
    DTL: 'Downtown Line',
  },
};
