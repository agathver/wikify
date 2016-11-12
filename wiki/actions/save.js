var utils = require('../../lib/utils');
var Page = require('../page');
var Text = require('../text');
module.exports = function(req, res, next) {
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
            text: text._id,
            $push: {
                revisions: text._id,
            }
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
            console.log(data);
            data.populate('text', function(err, data) {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                res.render('wiki/edit', data);
            });
        });
    });
}