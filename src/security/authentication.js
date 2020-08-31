const passport = require('passport');
const {Strategy: LocalStrategy} = require('passport-local');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const i18n = require("i18n");

const strategy = new LocalStrategy(async function (username, password, done) {
    console.log("logging in");
    try {
        const user = await User.findOne({username: username}).exec();
        console.log("logging in");
        if (!user) {
            return done(null, false, {
                message: i18n.__('login.usernameNotFound')
            });
        }
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return done(null, false, {
                message: i18n.__('login.passwordIncorrect')
            });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
});

passport.use('local', strategy);
module.exports = passport;
