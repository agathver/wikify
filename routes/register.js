var express = require('express');
var user = require('../lib/user');
var router = express.Router();
/* GET rigister page. */
router.get('/', function(req, res, next) {
    req.wikifyTransientSession.redirectTo = req.query['redirectUrl'] || '/';
    res.render('register');
});
router.post('/', function(req, res, next) {
    var redirect = req.wikifyTransientSession.redirectTo || '/';
    if (!req.body['username'] || !req.body['password']) {
        return res.status(400).send("Bad request");
    }
    user.create(req.body['username'], req.body['password']).then(function(user) {
        //     //req.wikifySecureSession.user = {
        //         id: user._id,
        //         username: user.username
        //     }
        //     req.session.redirectTo = '';
        //     res.redirect(redirect);
        res.json({
            id: user._id,
            username: user.username
        })
    }).catch(function(err) {
        res.render('register', {
            error: true,
            message: 'USername or password incorrect'
        })
    });
});
module.exports = router;