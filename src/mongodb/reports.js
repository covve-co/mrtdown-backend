const logger = require('../logger');
const mongodb = require('./index');

const reportsCollection = () => {
  return mongodb.db().collection('reports');
};

module.exports.all = async () => {
  const reports = await reportsCollection().find({}).toArray();
  logger.debug('Fetched ' + reports.length + ' posts.');
  return reports;
};

module.exports.insert = async (report) => {
  const document = {
    line: report.line,
    level: report.level,
    timestamp: new Date(),
  };
  await reportsCollection().insert(document);
  logger.debug('Inserted report.');
};
