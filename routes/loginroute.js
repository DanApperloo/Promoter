//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const passport = require('passport');
const localConfig = require('../config/local');

// /login
router.get('/',
    passport.authenticate('atlassian-oauth')
);

// /login/callback
router.get('/callback',
    passport.authenticate('atlassian-oauth', { failureRedirect: '/login/failure' }),

    function (req, res) {
        var redirectUrl = req.cookies[localConfig.redirectCookieName];

        // Successful authentication
        if (redirectUrl === undefined) {
            res.redirect('/');
        }
        else {
            res.clearCookie(localConfig.redirectCookieName);
            res.redirect(redirectUrl);
        }
    }
);

// /login/failure
router.get('/failure', (req, res, next) => {
    res.clearCookie(localConfig.redirectCookieName);
    res.redirect('/');
});


module.exports = router;