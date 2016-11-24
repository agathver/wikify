const User = require('../wikify/models/user'),
    bcrypt = require('bcrypt');
config = require('../config');

function genHash(password) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(config.bcrypt.rounds, function(err, salt) {
            if (err) reject(err);
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) reject(err);
                resolve(hash);
            });
        });
    });
}
module.exports = {
    assertUsernameAvailable: function(username) {
        return new Promise(function(resolve, reject) {
            User.findOne({
                username: username
            }).then(function(user) {
                if (user) reject("user exists");
                else resolve(true);
            }).catch(function(err) {
                reject(err);
            });
        });
    },
    findByUsername: function(username) {
        return Promise.resolve(User.findOne({
            username: username
        }));
    },
    login: function(username, password) {
        return User.findOne({
            username: username,
            password: password
        }).exec();
    },
    create: function(username, password) {
        return genHash(password).then(function(hash) {
                return new User({
                    username: username,
                    password: hash
                }).save();
            });
    },
    updatePassword: function(username, oldPassword, newPassword) {
        return User.findOneAndUpdate({
            username: username,
            password: oldPassword
        }, {
            password: newPassword
        }, {
            new: false,
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: false
        }).exec();
    },
    updateProfile: function(user) {
        if (user.password) {
            delete user.password;
        }
        return User.findOneAndUpdate({
            username: user.username
        }, user, {
            new: false,
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: false
        }).exec();
    }
}