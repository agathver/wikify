var express = require('express');
var user = require('../lib/user');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    req.wikifyTransientSession.redirectTo = req.query['redirectUrl'] || '/';
    res.render('login');
});
router.post('/', function(req, res, next) {
    var redirectTo = req.wikifyTransientSession.redirectTo || '/';
    if (!req.body['username'] || !req.body['password']) {
        console.log("Malformed request");
        console.log(req.body);
        return res.status(400).render('login', {
            error: {
                message: 'Username and password are required'
            }
        });
    }
    user.login(req.body['username'], req.body['password']).then(function(user) {
        if (!user) {
            return res.status(401).render('login', {
                error: {
                    message: 'Username or password incorrect'
                }
            });
        }
        req.wikifySecureSession.user = {
            id: user._id,
            username: user.username
        }
        req.wikifyTransientSession.redirectTo = '';
        res.redirect(redirectTo);
    }).catch(function(err) {
        console.log(err);
        next(err);
    });
});
module.exports = router;