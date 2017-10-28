const db = require('./db');
const state = {};

module.exports.setup = () => {
  db.connect(state);
};
