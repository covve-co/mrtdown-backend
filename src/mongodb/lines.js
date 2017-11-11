const logger = require('../logger');
const mongodb = require('./index');

const linesCollection = () => {
  return mongodb.db().collection('lines');
};

module.exports.findLatest = async (shortName) => {
  const line =
    await linesCollection()
    .find({shortName})
    .sort({timestamp: -1})
    .limit(1)
    .toArray();
  logger.debug('Fetched ' + shortName + ' line.');
  return line[0];
};

module.exports.find = async(id) => {
  const line = linesCollection().findOne({_id: id});
  logger.debug('Fetched 1 line.');
  return line;
};

module.exports.insert = async (line) => {
  const document = {
    shortName: line.shortName,
    level: line.level,
    timestamp: new Date(),
  };
  await linesCollection().insert(document);
  logger.debug('Inserted line.');
};