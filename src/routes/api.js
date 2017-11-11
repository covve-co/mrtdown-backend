const postsDb = require('../mongodb/posts');
const statusDb = require('../mongodb/status');
const linesDb = require('../mongodb/lines');
const reportsDb = require('../mongodb/reports');
const wrap = require('express-async-wrap');
const email = require('../email');

const RateLimit = require('express-rate-limit');
const limiter = new RateLimit({
  windowMs: 5 * 60 * 1000,
  max: 1,
  delayMs: 0,
});

module.exports = (app) => {

  // Fetch the current status of all the lines.
  app.get("/status", wrap(async (req, res) => {
    const status = await statusDb.get();
    for (const shortName in status.lines) {
      const id = status.lines[shortName];
      const line = await linesDb.find(id);
      delete line._id;
      status.lines[shortName] = line;
    }
    delete status._id;

    status.description = "";

    res.json(status);
  }));

  // Fetch the tweet list to display at the bottom.
  app.get("/tweetlist", wrap(async (req, res) => {
    const posts = await postsDb.all();
    for (const post in posts) {
      delete post._id;
    }
    res.json(posts);
  }));

  // Reporting endpoint
  app.post("/report", limiter, wrap(async (req, res) => {
    const line = req.body.line;
    const level = req.body.level;
    if (!line || !level) {
      return res.json({
        error: 'Parameters incomplete.',
      });
    }

    const report = {line, level};
    await reportsDb.insert(report);
    email.send(report);

    res.json({message: 'Report saved!'});
  }));

  return app;
};
