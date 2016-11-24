var utils = require('../../lib/utils');
var Page = require('../models/page');
var Text = require('../models/text');
module.exports = function(req, res, next) {
    var reqPage = req.params[0];
    Page.findOne({
        slug: reqPage
    }).populate('text').exec(function(err, data) {
        if (err || !data) {
            console.log(err);
            return next(err);
        }
        console.log(data);
        res.render('wiki/page', {
            page: data,
            user: req.wikifySecureSession.user
        });
    });
}