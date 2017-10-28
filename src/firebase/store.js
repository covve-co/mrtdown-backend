const config = require('../config');
const logger = require('../logger');

const firebase = require('./index');

let wrap = {};
module.exports.getState = () => wrap.state;
module.exports._setState = newState => wrap.state = newState;

let lastUpdate = 0;
module.exports.setState = (newState) => {
  wrap.state = newState;
  const updateInterval = config.firebase.updateInterval;
  const curTime = new Date().getTime() / 1000;
  if (curTime - lastUpdate > updateInterval) {
    lastUpdate = curTime;
    setTimeout(() => {
      const ref = firebase._app().database().ref();
      ref.set(wrap.state);
    }, (updateInterval - 1) * 1000);
  }
};

// Some utility functions to work with the state
module.exports.updateLine = (name, newLine) => {
  // FIXME
  const state = JSON.parse(JSON.stringify(getState()));
  state.lines[name] = newLine;
  module.exports.setState(state);
};

module.exports.clearLine = (name) => {
  // FIXME
  const state = JSON.parse(JSON.stringify(getState()));
  delete state.lines[name];
  module.exports.setState(state);
};
