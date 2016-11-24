"use strict";
"use es6";
const config = require('./config'),
    express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    clientSessions = require("client-sessions"),
    session = require("express-session"),
    MongoDbStore = require('connect-mongodb-session')(session),
    kleiDust = require("klei-dust"),
    flash = require('connect-flash'),
    strings = require('./trans/strings'),
    auth = require('./wikify/authentication');


//var requireAll = require('include-all');
var routes = require('./routes/index');
var users = require('./routes/users');
var wiki = require('./routes/wiki');
//var login = ;

var register = require('./routes/register');
mongoose.connect('mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name);
//connect to session stores
var sessionStore = new MongoDbStore({
    uri: 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name,
    collection: 'wikifySessions'
});

//initialize express app
var app = express();
//app.models = requireAll('./models');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('dust', kleiDust.dust);
app.set('view engine', 'dust');
app.set('view options', {
    layout: false
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (app.get('env') != 'test') app.use(logger('dev'));
app.use(clientSessions({
    cookieName: '_secureSession',
    secret: config.secrets.cookieSecret,
    duration: 7 * 24 * 60 * 60 * 1000, //7 days
    cookie: {
        httpOnly: true,
        secure: false // 'secureProxy' for production
    }
}));
app.use(session({
    name: 'wikify.sessid',
    secret: config.secrets.cookieSecret3,
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {}
}));
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, config.server.static)));

app.use(flash());
app.use(auth.initialize());
app.use(auth.session());

//configure routes
app.use('/', routes);
app.use('/users', users);
app.use('/wiki', wiki);
app.use('/login', require('./routes/login')(auth));
app.use('/register', register);

//passport authentication mechanism
// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.


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
module.exports = app;