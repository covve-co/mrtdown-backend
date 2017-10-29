const config = require('../config');
const logger = require('../logger');

const MongoClient = require('mongodb').MongoClient;
let db;

module.exports.initialize = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(config.mongodb.url, (err, _db) => {
      if (err) return reject(err);
      db = _db;
      logger.info('Connected to MongoDB.');
      resolve();
    });
  });
};
