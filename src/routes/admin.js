const config = require('../config');

const linesDb = require('../mongodb/lines');
const statusDb = require('../mongodb/status');

const wrap = require('express-async-wrap');
const fs = require('fs');
const form = fs.readFileSync(__dirname + '/form.html').toString();

module.exports = (app) => {

  app.get("/", wrap(async (req, res) => {
    res.send(form);
  }));

  app.post("/", wrap(async (req, res) => {
    // Extract the params
    const shortname = req.body.shortname;
    const level = req.body.level;
    const secret = req.body.secret;

    if (shortname && level && secret) {
      const levelInt = parseInt(level);
      if (levelInt >= 0 && levelInt <= 5) {
        if (secret === config.secret) {
          await linesDb.insert({shortName: shortname, level: levelInt});
          const line = await linesDb.findLatest(shortname);
          await statusDb.update(shortname, line._id);
          return res.send('<h1>Ok.</h1>');
        }
        return res.status(401).send('<h1>Not authorized</h1>');
      }
    }
    return res.status(422).send('<h1>Nope</h1>');
  }));

  return app;
};
