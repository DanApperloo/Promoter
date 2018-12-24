// Module Requirements
const express           = require('express');
const session           = require('express-session');
const mongoStore        = require('connect-mongo')(session);
const path              = require('path');
const bodyParser        = require('body-parser');
const cookieParser      = require('cookie-parser');
const cors              = require('cors');
const mongoose          = require('mongoose');
const passport          = require('passport');

// Configuration Requirements
const localConfig       = require('./config/local');
const dbConfig          = require('./config/database');


// Component Setup and Configuration
/// Connect mongoose to our database
mongoose.connect(dbConfig.database, dbConfig.options);
mongoose.set('debug', true);

// Configure Passport
require('./config/passport');

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

// Create App
var app = express();

// Connect Middleware
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    store: new mongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 2 * 24 * 60 * 60,   // 2 Days
        autoRemove: 'native'
    }),
    secret: 'I dont know how to spell my middle name',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Routes
app.use(require('./routes'));

// Add an error handler
app.use(function (e, req, res, next) {
    if (!isProduction) {
        res.status(400).json({ error: { msg: e.message, stack: e.stack } });
    }
    else {
        res.status(400).json({ error: { msg: e.message, stack: ""} });
    }
});

// Startup the listeners before starting the server
require('./controllers/listenercontroller');

// Start Server
app.listen(localConfig.port, function () {
    console.log(`Server listening on port: ${localConfig.port}`);
});