const logger = require('../logger');
const mongodb = require('./index');

const statusCollection = () => {
  return mongodb.db().collection('status');
};

module.exports.get = async () => {
  const status = await statusCollection().findOne();
  logger.debug('Fetched status.');
  return status || { lines: {} };
};

module.exports.update = async (shortName, id) => {
  const status = await module.exports.get();
  status.lines[shortName] = id;

  // Update or insert depending on whether it exists.
  // FIXME there's probably some Mongo option for this behaviour.
  if (status._id) {
    await statusCollection().update({_id: status._id}, status);
    logger.debug('Updated status.');
  } else {
    await statusCollection().insert(status);
    logger.debug('Status not found. Insert status.');
  }
};
