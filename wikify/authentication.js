const passport = require('passport'),
    //flash = require('connect-flash')
    //utils = require('./utils')
    LocalStrategy = require('passport-local').Strategy,
    RememberMeStrategy = require('passport-remember-me').Strategy,
    User = require('./models/user'),
    bcrypt = require('bcrypt'),
    strings = require("../trans/strings");
passport.use(new LocalStrategy(function(username, password, done) {
	console.log("logging in");
    User.findOne({
        username: username
    }).exec().then(function(user) {
    	console.log("logging in");
        if (!user) {
            return done(null, false, {
                message: strings.login.username_not_found
            });
        }
        bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
            if (!res) {
                return done(null, false, {
                    message: strings.login.password_incorrect
                });
            }
            return done(null, user);
        });
    }).catch(function(err) {
        return done(err);
    });
}));
module.exports = passport;