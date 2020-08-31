const express = require('express');
const User = require('../security/user');
const router = express.Router();

router.get('/', function (req, res, next) {
    req._session.redirectTo = req.query['redirectUrl'] || '/';
    res.render('register.html.twig');
});

router.post('/', async function (req, res, next) {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).send("Bad request");
    }

    try {
        if (!await User.findByUsername(username)) {
            const user = User.create(username, password);
            user.password = "";
            res.redirect(req._session.redirectTo);
        } else {
            res.render('register.html.twig', {
                error: true,
                message: 'Username not available'
            })
        }
    } catch (err) {
        console.log(err);
        res.render('register.html.twig', {
            error: true,
            message: 'Username or password incorrect'
        })
    }
});

module.exports = router;
