// Module Requirements
const passport = require('passport');
const JiraOauthStrategy  = require('passport-atlassian-oauth').Strategy;
const localConfig = require('./local');
const User = require('../models/UserModel');


/// Configure OATH passport middleware
passport.use(new JiraOauthStrategy({
    applicationURL: localConfig.jiraBaseUrl,
    callbackURL: localConfig.thisServer + "/login/callback",
    consumerKey: localConfig.bitbucketConsumerKey,
    consumerSecret: localConfig.bitbucketConsumerSecret
},
    function (token, tokenSecret, profile, cb) {
        User.findOneOrCreate(profile.id, function (err, user) {
            return cb(null, user.id);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});