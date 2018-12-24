const localConfig = require('../config/local');
const User = require('../models/UserModel');


// Enforces that the user is authenticated via Jira
function loggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.cookie(localConfig.redirectCookieName, req.originalUrl, { maxAge: 90000, httpOnly: true });
        res.redirect('/login');
    }
};

// Enforces that the user is an Admin of the Promoter App
function userIsAdmin(req, res, next) {
    User.findById(req.user, (err, user) => {
        if (err) {
            return res.status(500).send("Must be an authenticated user to perform that action");
        }

        if (user.admin) {
            return next();
        }
        
        return res.status(500).send("Must be an Admin to perfrom that action");
    });
};


// Expose our helper functions through friendly names
module.exports = {
    isAuth: loggedIn,
    isAdmin: userIsAdmin
};