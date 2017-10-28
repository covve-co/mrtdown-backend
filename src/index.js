const config = require('./config');

const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const aa = require('express-async-await');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const store = require('./store');

const api = require('./routes/api');
const admin = require('./routes/admin');

// Create express app
const app = aa(express());
const server = http.createServer(app);
const io = socketio(server);

// Setup DB
store.setup();

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
  console.log('Server listening on port ' + config.port + '.');
});
