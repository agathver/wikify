import {NextFunction, Request, Response} from "express";
import config from "../config";

export function index(req: Request, res: Response, next: NextFunction) {
    res.render('index.html.twig', {title: config.site.title});
};

