const config = require('../config');

const logger = require('../logger');

const mongodb = require('mongodb');
const assert = require('assert');

// Connect to MongoDB
module.exports.connect = (state) => {
  mongodb.MongoClient.connect(config.db.url, (err, db) => {
    if (err) throw new Error('Error connecting to MongoDB.');
    logger.info('Connected to MongoDB.');
    state.db = db;
  });
};
