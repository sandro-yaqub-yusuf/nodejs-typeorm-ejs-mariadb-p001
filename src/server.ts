import 'reflect-metadata';
import './database';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import session from 'express-session';
import routes from './routes';

dotenv.config();

declare module 'express-session' {
    interface SessionData {
        userId?: number;
        userLogin?: string;
        userName?: string;
        userEmail?: string;
        userTypeId?: number;
        userImageUrl?: string;
        token?: string;
        sessionFlash?: {};
        parameters?: {};
    }
}

const server = express();

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

server.use(express.static(path.join(__dirname, '../public')));
server.use(
    session({
        name: 'qid',
        secret: (process.env.COOKIESECRET as string),
        resave: true,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: (1 * 24 * 60 * 60 * 1000),
            sameSite: true
        }
    })
);

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(routes);
server.use((req, res) => { 
    res.render('site/404', { menuList: [], pageList: [], sessionUser: req.session });
});

server.listen(process.env.NODE_PORT, () => {
    console.log('Servidor NodeJS rodando na porta ' + process.env.NODE_PORT);
});
