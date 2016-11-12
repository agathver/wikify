var User = require('../wiki/user');


module.exports = {
    login: function(username, password) {
        return User.findOne({
            username: username,
            password: password
        }).exec();
    },
    create: function(username, password) {
        return new User({
            username: username,
            password: password
        }).save();
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