var express = require('express'),
    swig = require('swig');

var app = express();

// Middlewares
app.use(express.bodyParser());

// Templating
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');
app.set('view cache', false);

module.exports = app;
