var express = require('express');
var user = require('../lib/user');
var router = express.Router();
/* GET rigister page. */
router.get('/', function(req, res, next) {
    req.session.redirectTo = req.query['redirectUrl'] || '/';
    res.render('register');
});
router.post('/', function(req, res, next) {
    //var redirect = req.session.redirectTo || '/';
    var username = req.body['username'],
        password = req.body['password']
    if (!username || !password) {
        return res.status(400).send("Bad request");
    }
    user.assertUsernameAvailable(username).then(function(res) {
        return user.create(username, password);
    }).then(function(user) {
        user.password = "";
        console.log(user);
        res.json(user);
    }).catch(function(err) {
        console.log(err);
        res.render('register', {
            error: true,
            message: 'Username or password incorrect'
        })
    });
});
module.exports = router;