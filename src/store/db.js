const config = require('../config');

const mongodb = require('mongodb');
const assert = require('assert');

// Connect to MongoDB
module.exports.connect = (state) => {
  mongodb.MongoClient.connect(config.db.url, (err, db) => {
    if (err) throw new Error('Error connecting to MongoDB.');
    console.log('Connected to MongoDB.');
    state.db = db;
  });
};
