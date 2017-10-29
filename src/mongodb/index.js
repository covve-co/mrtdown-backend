const config = require('../config');
const logger = require('../logger');

const MongoClient = require('mongodb').MongoClient;
let db;

module.exports.initialize = async () => {
  db = await MongoClient.connect(config.mongodb.url);
  logger.info('Connected to MongoDB.');
};

module.exports.db = () => db;
