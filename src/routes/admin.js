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
    const shortName = req.body.short_name;
    const level = req.body.level;
    const secret = req.body.secret;
    const levelInt = parseInt(level);
    if (!shortName || !level || !secret || levelInt == NaN || levelInt < 0 || levelInt > 5) {
      return res.status(422).send('<h1>Nope</h1>');
    }

    if (secret === config.secret) {
      await linesDb.insert({
        shortName,
        level: levelInt,
      });
      const line = await linesDb.findLatest(shortName);
      await statusDb.update(shortName, line._id);
      return res.send('<h1>Ok.</h1>');
    }
    return res.status(401).send('<h1>Not authorized</h1>');
  }));

  return app;
};
