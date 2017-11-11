module.exports = {
  port: process.env.PORT,
  host: 'helloworld.com',
  logLevel: 'info',

  mongodb: {
    url: process.env.MONGODB_URL,
  },

  firebase: {
    serverKey: process.env.FIREBASE_SERVER_KEY,
  },

  reddit: {
    userAgent: 'MRTDownBot',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD,

    pollInterval: 30000,
  },

  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessTokenKey: process.env.TWITTER_ACCESS_TOKEN_KEY,
    accessTokenSecret: process.env.TWITTER_TOKEN_SECRET,

    verifiedUsername: 'SMRT_Singapore',
    keywords: [
      'MRT',
      'SMRT',
    ],
  },

  secret: process.env.SECRET,
};
