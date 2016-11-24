var config = require('./config');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var clientSessions = require("client-sessions");
var session = require("express-session");
var MongoDbStore = require('connect-mongodb-session')(session);
var kleiDust = require("klei-dust");
//var requireAll = require('include-all');
var routes = require('./routes/index');
var users = require('./routes/users');
var wiki = require('./routes/wiki');
var login = require('./routes/login');
var register = require('./routes/register');
var app = express();
mongoose.connect('mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name);
var sessionStore = new MongoDbStore({
        uri: 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name,
        collection: 'wikifySessions'
    })
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

if(app.get('env') != 'test')
    app.use(logger('dev'));

app.use(clientSessions({
    cookieName: 'wikifySecureSession',
    secret: config.secrets.cookieSecret,
    duration: 7 * 24 * 60 * 60 * 1000, //7 days
    cookie: {
        httpOnly: true,
        secure: false // 'secureProxy' for production
    }
}));
app.use(clientSessions({
    cookieName: 'wikifyTransientSession',
    secret: config.secrets.cookieSecret2,
    duration: 30 * 60 * 1000, //30 minutes
    cookie: {
        ephemeral: true,
        httpOnly: true,
        secure: false // 'secueProxy' for production
    }
}));
// app.use(sessions({
//     name: 'wikify.sid'
//     secret: config.secret.cookieSecret3,
//     rolling: true,
//     cookie: {}
// }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, config.server.static)));
app.use('/', routes);
app.use('/users', users);
app.use('/wiki', wiki);
app.use('/login', login);
app.use('/register', register);
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