var express = require('express');
var router = express.Router();
var actions = require('../actions');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get(/\/(.*)/, function (req, res, next) {
    var action = req.query['action'] || 'view';
    console.log(action);
    switch (action) {
        case 'view':
            actions.view(req, res, next);
            break;
        case 'edit':
            actions.edit(req, res, next);
            break;
    }
});
router.post(/\/(.*)/, function (req, res, next) {
    //permission checking
    var action = req.params['action'] || 'save';
    switch (action) {
        case 'save':
            actions.save(req, res, next);
    }
});
module.exports = router;
