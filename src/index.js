const config = require('./config');
const express = require('express');
const aa = require('express-async-await');
const morgan = require('morgan');

const api = require('./routes/api');
const admin = require('./routes/admin');

const app = aa(express());

// Middleware
app.use(morgan('tiny'));

// Mount routes
app.use("/api", api(express.Router()));
app.use("/admin", admin(express.Router()));

app.listen(3000);
