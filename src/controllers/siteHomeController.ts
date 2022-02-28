import { Request, Response } from 'express';
import HomeService from '../services/homeService';
import MenuService from '../services/menuService';
import PageService from '../services/pageService';
import ParameterService from '../services/parameterService';

class SiteHomeController {
    public async index(req: Request, res: Response): Promise<void> {
        delete req.session.sessionFlash;

        const menuList = await MenuService.getAll(1, false, 'orderShow');
        const pageList = await PageService.getAll(1, false, 'orderShow');

        if (!req.session.parameters) {
            ParameterService.getAll().then(parameterData => {
                req.session.parameters = parameterData;
    
                res.render('site/home', { menuList, pageList, sessionUser: req.session });
            }).catch(() => {
                req.session.parameters = [
                    {attribute: 'SITE-TITLE', value: 'SITE - 500 ERROR'},
                    {attribute: 'SITE-DESCRIPTION', value: 'SITE - 500 ERROR'},
                    {attribute: 'SITE-LOGO-NAME-HTML5', value: 'SITE - 500 ERROR'}
                ];

                res.render('site/500', { categoryList: [], menuList: [], pageList: [], sessionUser: req.session });
            });
        }
        else {
            res.render('site/home', { menuList, pageList, sessionUser: req.session });
        }
    }
    
    public async page(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        const menuList = await MenuService.getAll(1, false, 'orderShow');
        const pageList = await PageService.getAll(1, false, 'orderShow');

        PageService.getById(parseInt(id)).then(pageData => {
            if (pageData) {
                res.render('site/page', { pageData, menuList, pageList, sessionUser: req.session });
            } else {
                res.redirect('/');
            }
        }).catch(() => {
            res.render('site/500', { menuList: [], pageList: [], sessionUser: req.session });
        });
    }

    public async sendEmailContact(req: Request, res: Response): Promise<void> {
        const contactData = req.body;

        HomeService.sendEmail(contactData).then(retorno => {
            if (retorno) return res.status(200).json({ message: 'O Email foi enviado com sucesso !' });
            else return res.status(400).json({ message: 'O Email não pode ser enviado !' });
        }).catch(() => {
            return res.status(400).json({ message: 'O Email não pode ser enviado !' });
        });
    }
}

export default new SiteHomeController();
