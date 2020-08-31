const Page = require('../models/page');
module.exports = async function (req, res, next) {
    const reqPage = req.params[0];
    const page = await Page.findOne({
        slug: reqPage
    }).populate('text').exec();
    console.log(page);
    res.render('wiki/page.html.twig', {
        page,
        user: req.user
    });
}
