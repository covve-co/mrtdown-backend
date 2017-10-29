const logger = require('../logger');
const mongodb = require('./index');

const linesCollection = () => {
  return mongodb.db().collection('lines');
};
