const express = require('express');
const path = require('path');
const crypto = require('crypto');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('./models/db');
const publicRoutes = require('./routes/public');
const apiRoutes = require('./routes/api');

const PATH = require('../configs/paths');

const app = express();

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

// view engine setup
app.set('views', path.join(__dirname, '../src/'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(PATH.build));


const secret = crypto.randomBytes(16).toString('hex');
app.use(session({
    secret,
    key: 'keys',
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 1000*60*60,
    },
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
}));

require('../configs/config-passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', publicRoutes);
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    console.log(err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
