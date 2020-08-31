const express = require('express');
const router = express.Router();
/* GET home page. */
module.exports = function (passport) {
    router.get('/', function (req, res, next) {
        req._session.redirectTo = req.query['redirectUrl'] || '/';
        res.render('login.html.twig');
    });
    router.post('/', passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), function (req, res, next) {
        console.log("body parsing", req.body);
        console.log("logging in route");
        const redirectTo = req._session.redirectTo || '/';
        res.redirect(redirectTo);
    });
    return router;
}
//module.exports = router;
