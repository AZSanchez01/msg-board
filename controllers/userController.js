const passport = require('passport');
const pool = require('../model/pool');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const validateSignup = [
    body("first_name").trim()
    .isAlpha().withMessage('First name must contain only letters')
    .isLength({ min: 1, max: 20}).withMessage('First name must be of length 1-20'),

    body("last_name").trim()
    .isAlpha().withMessage('Last name must contain only letters')
    .isLength({ min: 1, max: 20}).withMessage('Last name must be of length 1-20'),

    body("username").trim()
    .custom(async (value) => {
        const result = (await pool.query("SELECT username FROM users WHERE username = $1 ", [value])).rows;
        if (result.length > 0) throw new Error('Email is already taken');
        return true;
    })
    .withMessage('Email is already taken'),

    body("password").trim()
    .isLength({ min: 5}).withMessage('Password must be at least of length 5'),

    body("re_password").trim()
    .custom((value, { req }) => value === req.body.password).withMessage('Password & re-entered password do not match')
]

// SIGN UP AND ADD NEW USER TO DATABASE LOGIC
exports.signupGet = (req, res) => {
    res.render('signup', { title: "Sign-up", errors: [], formData: {} });
}
exports.signupPost = [
    validateSignup,
    async (req, res) => {
        const { first_name, last_name, username, password, re_password } = req.body;

        //ERROR HANDLING FOR INVALID DATA
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('signup', 
                {   title: 'Sign-up', 
                    errors: errors.array(), 
                    formData: {first_name, last_name, username, password, re_password }
                });
        }
        
        // PASS VALID USER DATA TO DATABASE
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = `INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)`;
        await pool.query(insertQuery, [first_name, last_name, username, hashedPassword]);
        res.redirect('/');
}]

exports.indexLoginGet = (req, res) => {
    res.render('index', { title: "Log-in" });
}
exports.indexLoginPost = passport.authenticate('local', { failureRedirect: '/error', successRedirect: '/dashboard' });

exports.logoutGet = (req, res) => {
    req.logout((err) => {
        if(err) {return next(err);}
        res.redirect('/');
    });
}

exports.dashboardGet = [
    isUser,
    async (req, res) => {
        const messages = (await pool.query('SELECT * FROM messages ORDER BY timestamp DESC')).rows
        res.render('dashboard', { title: 'Dashboard', user: req.user, messages: messages });
    }
]

exports.errorDefault = (req, res) => {
    res.render('error', { title: "Error" });
}

exports.setMemberPost = [
    isUser,
    async (req, res) => {
        const { member_code } = req.body;
        if (member_code === process.env.MEMBER_PW) {
            pool.query('UPDATE users SET member = TRUE WHERE username = $1', [req.user.username]);
            req.user.member = true;
        }
        else console.log('Incorrect code');
        res.redirect('/dashboard');
    }
];
exports.setAdminPost = [
    isUser,
    async (req, res) => {
        const { admin_code } = req.body;
        if (admin_code === process.env.ADMIN_PW) {
            pool.query('UPDATE users SET admin = TRUE WHERE username = $1', [req.user.username]);
        }
        else console.log('Incorrect code');
        res.redirect('/dashboard');
    }
];

exports.createMessagePost = [
    isUser,
    async (req, res) => {
        const { message_title, message } = req.body;
        const id = crypto.randomUUID();
        const author = `${req.user.first_name} ${req.user.last_name}`;
        const dateISO = (new Date()).toISOString();
        const dateSQL = dateISO.slice(0, 19).replace('T', ' ');

        await pool.query("INSERT INTO messages (id, message_title, message, author, timestamp) VALUES ($1, $2, $3, $4, $5);",
                            [id, message_title, message, author, dateSQL]);
        res.redirect('/dashboard');
    }
]

exports.deleteMessagePost = [
    isUser,
    isAdmin,
    async (req, res) => {
        const { messageID } = req.body;
        await pool.query('DELETE FROM messages WHERE id = $1', [messageID]);
        res.redirect('/dashboard');
    }
]

// HELPER MIDDLEWARE
function isUser (req, res, next) {
    if (req.isAuthenticated()) next();
    else res.status(401).render('error', { title: "Error"});
}
function isMember(req, res, next) {
    if (req.user.member) next();
    else res.status(401).render('error', { title: "Error"});
}
function isAdmin(req, res, next) {
    if (req.user.admin) next();
    else res.status(401).render('error', { title: "Error"});
}