var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var index = 0;
var app = express();
console.log('external path' + process.env.externalPath);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use((req, res, next)=>{
  index++;
  console.log(`----> ${index}`);
  var dateFormat = require('dateformat');

// Basic usage
  var now = new Date();
  var date = dateFormat(now , "dddd, mmmm dS, yyyy, h:MM:ss TT");
  console.log(date);
  console.log(req.originalUrl);
  next();
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(process.env.externalPath || path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
var recursive = ()=>{
  console.log('recursive');
  process.on('exit', recursive);
}
process.on('exit', (code) => {
  // do *NOT* do this

   recursive();



  setTimeout(() => {
    console.log('This will not run');
  }, 10000);
  console.log('About to exit with code:', code);
});

console.log('Nurit make sure it works');

module.exports = app;
