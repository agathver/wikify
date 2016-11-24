var express = require('express');
var user = require('../lib/user');
var router = express.Router();
/* GET home page. */
module.exports = function(passport) {
        router.get('/', function(req, res, next) {
            req.session.redirectTo = req.query['redirectUrl'] || '/';
            res.render('login');
        });
        router.post('/', passport.authenticate('local', {
            //successRedirect: redirectTo,
            failureRedirect: '/login',
            failureFlash: true
        }), function(req, res, next) {
            console.log("body parsing", req.body);
            console.log("logging in route");
            var redirectTo = req.session.redirectTo || '/';
            res.redirect(redirectTo);
        });
        return router;
    }
    //module.exports = router;