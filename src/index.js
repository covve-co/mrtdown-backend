const config = require('./config');
const logger = require('./logger');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const mongodb = require('./mongodb');
const firebase = require('./firebase');
const twitter = require('./twitter');
const reddit = require('./reddit');

const api = require('./routes/api');
const admin = require('./routes/admin');

(async () => {

  // Create express app
  const app = express();

  // Setup services
  await mongodb.initialize();
  firebase.intialize();
  twitter.initialize();
  reddit.initialize();

  reddit.beginPolling();
  twitter.beginStream(lol => console.log(lol));

  // Middleware
  app.use(morgan('tiny'));
  app.use(bodyParser.json());

  // Static
  app.use(express.static(__dirname + '/node_modules/socket.io'));
  app.use(express.static(__dirname + '/node_modules/jquery/dist'));

  // Mount routes
  app.use("/api", api(express.Router()));
  app.use("/admin", admin(express.Router()));

  // Launch app
  app.listen(config.port, () => {
    logger.info('Server listening on port ' + config.port + '.');
  });

})();
