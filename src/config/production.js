module.exports = {
  port: process.env.PORT,
  host: 'helloworld.com',
  logLevel: 'info',
  db: {
    url: process.env.DATABASE_URL,
  },
};
