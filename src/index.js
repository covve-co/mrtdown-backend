const config = require('./config');
const logger = require('./logger');

const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const aa = require('express-async-await');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const firebase = require('./firebase');
const store = require('./firebase/store');
const twitter = require('./twitter');
const reddit = require('./reddit');

const api = require('./routes/api');
const admin = require('./routes/admin');

(async () => {

  // Create express app
  const app = aa(express());
  const server = http.createServer(app);
  const io = socketio(server);

  // Setup services
  await firebase.intialize();
  await twitter.initialize();
  await reddit.initialize();

  store.setState({hello: 'no'});

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
  server.listen(config.port, () => {
    logger.info('Server listening on port ' + config.port + '.');
  });

})();
