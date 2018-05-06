'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');

const plopRouter = require('./api/plop');
const followRouter = require('./api/follow');
const pageRouter = require('./api/page');

let app = express();
let router = express.Router();

app.use(logger('dev'));

mongoose.connect('mongodb://master_plop:YOUR_PASSWORD@ds115360.mlab.com:15360/plops')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', plopRouter);
app.use('/api', followRouter);
app.use('/api', pageRouter);


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader(   'Access-Control-Allow-Headers',
   'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

var port = 3001;

app.listen(port);

console.log('api listening on: ', port);
