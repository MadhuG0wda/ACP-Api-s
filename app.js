const express = require('express')
const app = express();
const userRoutes = require('./api/routes/user');

app.use('/users',userRoutes);

module.exports = app;