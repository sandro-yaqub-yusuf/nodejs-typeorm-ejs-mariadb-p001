import express from 'express';
import * as ExpressValidator from 'express-validator';
import AuthService from '../services/authService';
import ParameterService from '../services/parameterService';

class AdminAuthController {
    public async login(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        if (!req.session.parameters) {
            ParameterService.getAll().then(parameterData => {
                req.session.parameters = parameterData;
    
                res.render('admin/auth/login', { sessionUser: req.session, sessionFlash: null });
            }).catch(() => {
                req.session.parameters = [
                    { attribute: 'SITE-TITLE', value: 'SITE - 500 ERROR' },
                    { attribute: 'SITE-DESCRIPTION', value: 'SITE - 500 ERROR' },
                    { attribute: 'SITE-LOGO-NAME-HTML5', value: 'SITE - 500 ERROR' }
                ];

                res.render('site/500', { sessionUser: req.session });
            });
        }
        else {
            res.render('admin/auth/login', { sessionUser: req.session, sessionFlash: null });
        }
    }

    public async loginAction(req: express.Request, res: express.Response): Promise<void> {
        const userData = req.body;
        const errors = ExpressValidator.validationResult(req);

        if (errors.isEmpty() === false) {
            res.render('admin/auth/login', { sessionFlash: { type: 'danger', message: errors.array() } });
        } else {
            AuthService.authenticateByLogin({ login: userData.login, password: userData.password }).then(auth => {
                req.session.userId = auth.user.id;
                req.session.userLogin = auth.user.login;
                req.session.userName = auth.user.name;
                req.session.userEmail = auth.user.email;
                req.session.userTypeId = auth.user.userTypeId;
                req.session.userImageUrl = auth.user.imageUrl;
                req.session.token = auth.token;

                res.redirect('/admin');
            }).catch(error => {
                res.render('admin/auth/login', { sessionFlash: { type: 'danger', message: error.message } });
            });
        }
    }

    public async logout(req: express.Request, res: express.Response): Promise<void> {
        req.session.destroy(() => {
            res.clearCookie('qid')

            res.redirect('/admin/login');
        });
    }
}

export default new AdminAuthController();
