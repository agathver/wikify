import {NextFunction, Request, Response} from "express";
import {isDevelopment} from "../utils";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    const message = isDevelopment ? error.message : i18n.__('errors.internalServerError');
    res.status(error.status || 500);
    res.render('error.html.twig', {message, error: isDevelopment ? error : undefined});
}
