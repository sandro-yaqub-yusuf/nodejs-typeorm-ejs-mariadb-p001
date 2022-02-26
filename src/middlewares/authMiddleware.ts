import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorization = req.session.token;

    if (!authorization) return res.redirect('/admin/login');

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, (process.env.JWTSECRET as string));

        if (!data) return res.redirect('/admin/login');

        return next();
    } catch {
        return res.redirect('/admin/login');
    }
}
