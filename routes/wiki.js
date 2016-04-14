var express = require('express');
var router = express.Router();
var Page = require('../models/page');
var Text = require('../models/text');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get(/\/(.*)/, function(req, res, next) {
    var reqPage = req.params[0];
    var action = req.query['action'] || 'view';
    console.log(action);
    switch (action) {
        case 'view':
            Page.findOne({
                slug: reqPage
            }).populate('text').exec(function(err, data) {
                if (err || !data) {
                    console.log(err);
                    return next(err);
                }
                console.log(data);
                res.render('wiki/page', data);
            });
            break;
        case 'edit':
            console.log('editing the file');
            res.render('wiki/edit', {
                title: req.params[0]
            });
    }
});
router.post(/\/(.*)/, function(req, res, next) {
    //permission checking
    var action = req.params['action'] || 'save';
    switch (action) {
        case 'view':
            res.render('wiki/page', {
                title: req.params[0]
            });
            break;
        case 'save':
            var title = req.body['title'];
            var parent = req.body['parent'];
            var slug = (parent ? parent + '/' : '') + req.body['title'].replace(/\s/, '_');
            var txt = new Text({
                content: req.body['text']
            });
            txt.save(function(err, text) {
                if (err) {
                    //console.log(err);
                    return next(err);
                }
                console.log(text);
                var page = Page.findOneAndUpdate({
                    slug: slug
                }, {
                    title: title,
                    text: text._id
                }, {
                    new: true,
                    upsert: true,
                    runValidators: true,
                    setDefaultsOnInsert: true
                }, function(err, data) {
                    if (err) {
                        console.log(err);
                        return next(err);
                    }
                    res.render('wiki/edit', data);
                });
            });
    }
});
module.exports = router;