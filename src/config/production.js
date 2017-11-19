module.exports = {
  port: process.env.PORT,
  host: 'mrtdown.covve.co',
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
    verfiedId: '307781209',
    keywords: [
      'MRT',
      'SMRT',
    ],
  },

  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    recipients: [
      'ravern@covve.co',
      'max@covve.co',
      'pyae@covve.co',
      'sean@covve.co',
      'yadunand@covve.co',
    ],
  },

  wit: {
    accessToken: process.env.WIT_TOKEN,
  },

  secret: process.env.SECRET,
};
