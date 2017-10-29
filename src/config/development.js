const secrets = require('./development.secrets');

module.exports = {
  port: 3000,
  host: 'locahost:3000',

  logLevel: 'debug',

  mongodb: {
    url: 'mongodb://localhost:27017/mrtdown_development',
  },

  firebase: {
    serverKey: secrets.firebase.serverKey,
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
};
