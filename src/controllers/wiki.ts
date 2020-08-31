import Page from "../models/page";
import {slugify, titleFromSlug} from "../utils/title";
import {NextFunction, Request, Response} from "express";

export async function viewPage(req: Request, res: Response, next: NextFunction) {
    const reqPage = req.params[0];
    const page = await Page.findOne({
        slug: reqPage
    }).populate('text').exec();
    console.log(page);
    res.render('wiki/page.html.twig', {
        page,
    });
}

export async function editPage(req: Request, res: Response, next: NextFunction) {
    const reqPage = req.params[0];
    const page = await Page.findOne({
        slug: reqPage
    }).populate('text').exec();

    if (!page) {
        res.status(404);
        res.render('wiki/edit.html.twig', {
            title: titleFromSlug(req.params[0]),
            newPage: true
        });
    }
    // @ts-ignore
    res.render('wiki/edit.html.twig', page);
}

export async function savePage(req: Request, res: Response, next: NextFunction) {
    const title = req.body['title'];
    const parent = req.body['parent'];
    const slug = slugify(parent + '/' + title);
    const content = req.body['text'] || '';

    // @ts-ignore
    const txt = new Text({content});
    // @ts-ignore
    const text = await txt.save();

    const page = await Page.findOneAndUpdate({
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
    });

    await page.populate('text')
    res.render('wiki/edit.html.twig', page);
}



