const express = require('express');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);

const router = require('./routers/userRouter');
const pool = require('./model/pool');
const passport = require('passport');

require('dotenv').config();

// INITIAL APP SETUP
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// SET UP SESSION
const sessionStore = new pgSession({ pool: pool });
app.use(expressSession({
    store: sessionStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // One day
}));

// PASSPORT AUTHENTICATION
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// APP ROUTES LOGIC
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log("Server running..."));