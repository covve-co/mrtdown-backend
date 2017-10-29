const wrap = require('express-async-wrap');

module.exports = (app) => {

  // Fetch the current status of all the lines.
  app.get("/status", wrap(async (req, res) => {
    res.send('Hello');
  }));

  return app;
};
