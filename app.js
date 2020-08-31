const config = require('./src/config')
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const clientSessions = require("client-sessions");
const flash = require('connect-flash');
const auth = require('./src/security/authentication');
const http = require('http');
const i18n = require("i18n");
const twig = require('twig');

const routes = require('./src/routes/index');
const users = require('./src/routes/users');
const wiki = require('./src/routes/wiki');

const register = require('./src/routes/register');

const isDevelopment = config.environment === 'development';

i18n.configure({
    directory: path.join(__dirname, 'translations'),
    objectNotation: true,
});

twig.cache(!isDevelopment);

mongoose.connect(config.db.uri);

const app = express();

app.set('view engine', 'twig');
app.set('views', path.join(__dirname, 'views'));
app.set("twig options", {
    allow_async: true, // Allow asynchronous compiling
});

app.use(logger(isDevelopment ? 'dev' : 'combined'));

app.use(clientSessions({
    cookieName: '_session',
    secret: config.session.secret,
    duration: config.session.duration,
    cookie: {
        httpOnly: true,
        secure: false
    }
}));

app.use(i18n.init)

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

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
app.use('/login', require('./src/routes/login')(auth));
app.use('/register', register);


app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (isDevelopment) {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error.html.twig', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html.twig', {
        message: err.message,
        error: {}
    });
});

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(config.server.port);
app.set('port', port);
/**
 * Create HTTP server.
 */
const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
