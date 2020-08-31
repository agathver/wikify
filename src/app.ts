import path from "path";
import config from "./config";
import express from "express";
import mongoose from "mongoose";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import clientSessions from "client-sessions";
import flash from "connect-flash";
import auth from "./security/authentication";
import i18n from "i18n";
import twig from "twig";

import {errorHandler} from "./controllers/errors";
import {isDevelopment} from "./utils";
import httpErrors from 'http-errors';

const routes = require('./routes');
const users = require('./routes/users');
const wiki = require('./routes/wiki');

const register = require('./routes/register');


i18n.configure({
    directory: path.join(__dirname, '../translations'),
    objectNotation: true,
});

twig.cache(!isDevelopment);

mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();

app.set('view engine', 'twig');
app.set('views', path.join(__dirname, '../views'));
app.set("twig options", {
    allow_async: true,
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
app.use(require('less-middleware')(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public')));

app.use(flash());
app.use(auth.initialize());
app.use(auth.session());

//configure routes
app.use('/', routes);
app.use('/users', users);
app.use('/wiki', wiki);
app.use('/login', require('./routes/login')(auth));
app.use('/register', register);


app.use(function (req, res, next) {
    next(new httpErrors.NotFound());
});

app.use(errorHandler);

app.listen(config.server.port, config.server.host, function (error) {
    if (error) {
        throw error;
    }
    console.log(`Server started on ${config.server.host}:${config.server.port}`);
})
