const wrap = require('express-async-wrap');

module.exports = (app) => {

  app.get("/", wrap(async (req, res) => {
    console.log("Hello world");
  }));

  return app;
};
