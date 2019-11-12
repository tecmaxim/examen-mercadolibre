const http = require('http');
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

// settings
app.set('port', process.env.PORT || 8080)

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text());

// routes
require('./routes/test')(app);


http.createServer(app)
  .listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
  });