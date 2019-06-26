const http = require('http');
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const mutant = require('./routes/dnaRoute');
const check = require('./functions/checkIsMutant');

// settings
app.set('port', process.env.PORT || 8080)

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routes
require('./routes/dnaRoute')(app, check);


// static files
app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app)
  .listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
  });