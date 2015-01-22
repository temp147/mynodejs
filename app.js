var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log4js = require('log4js');
//load the log configuration
log4js.configure('./lib/log4js_configuration.json');

var toobusy = require('toobusy');
//set maxlag default is 70ms set an 'average' server run at 90-100% CPU and request latency at around 200ms,10ms run at 60-70%
toobusy.maxLag(70);

//install the mustBe authorization framework
var mustbe = require('mustbe');
var mustbeconfig = require("./lib/mustbeconfig");
mustbe.configure(mustbeconfig);


var routes = require('./routes/index');
var users = require('./routes/users');


var expressJwt = require('express-jwt'); //https://npmjs.org/package/express-jwt

//the secret string is stored in config.jwtsecret
var config = require('./lib/config.js');
var secret = config.jwtsecret;

var app = express();
//var log = log4js.getLogger('app');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//use jwt to protect api

app.use('/app', expressJwt({secret: secret}));
app.use('/schedules', expressJwt({secret: secret}));


// uncomment after placing your favicon in /publi
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev')); //combined,common,dev,short,tiny
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);



app.use(function(err, req, res, next){
    if (err.constructor.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized');
    }
});

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', config.crossdomain);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true)
    // Pass to next layer of middleware
    if(toobusy()){
        console.log('BUSY');
        res.status(503).send("Mynodejs is stuck!!");
    }
    else{
        next();
    }

});

app.use('/schedules',function(req,res,next){
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});
// write restful api in the routes.js file
require('./routes')(app);



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


//TODO: add Oauth2.0
//TODO: enhance the Serverlog: log4js
//TODO: enhance the errorhandle
//TODO: Stress Testing.
//TODO: add Event Proxy?



module.exports = app;
