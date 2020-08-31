import {Router} from "express";
import passport from "./authentication";

const router = Router();

router.get('/', function (req, res, next) {
    // @ts-ignore
    req.session.redirectTo = req.query['redirectUrl'] || '/';
    res.render('login.html.twig');
});
router.post('/', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), function (req, res, next) {
    console.log("body parsing", req.body);
    console.log("logging in route");
    const redirectTo = req.session?.redirectTo || '/';
    res.redirect(redirectTo);
});

export default router;
