import express from 'express';
import * as expressValidator from 'express-validator';
import PageService from '../services/pageService';

class AdminPageController {
    public async index(req: express.Request, res: express.Response): Promise<void> {
        const sessionFlash = req.session.sessionFlash;
        
        delete req.session.sessionFlash;

        PageService.getAll().then(pageList => { 
            res.render('admin/page/index', { pageList, sessionUser: req.session, sessionFlash });
        });
    }

    public async create(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        if (req.session.userTypeId !== 1) {
            req.session.sessionFlash = { type: 'danger', message: 'Usuário não tem permissão para usar esta ação !' };

            res.redirect('/admin/pagina/listar');
        } else {
            res.render('admin/page/create', { pageData: null, sessionUser: req.session, sessionFlash: null });
        }
    }

    public async store(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        const pageData = req.body;
        const errors = expressValidator.validationResult(req);

        if (errors.isEmpty() === false) {
            res.render('admin/page/create', { pageData, sessionUser: req.session, sessionFlash: { type: 'danger', message: errors.array() } });
        } else {
            PageService.store(pageData).then(() => {
                req.session.sessionFlash = { type: 'success', message: 'Página cadastrada com sucesso...' };

                res.redirect('/admin/pagina/listar');
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/pagina/listar');
            });
        }
    }

    public async edit(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        if (req.session.userTypeId !== 1) {
            req.session.sessionFlash = { type: 'danger', message: 'Usuário não tem permissão para usar esta ação !' };

            res.redirect('/admin/pagina/listar');
        } else {
            const { id } = req.params;

            PageService.getById(parseInt(id)).then(pageData => {
                if (pageData) {
                    res.render('admin/page/edit', { pageData, sessionUser: req.session, sessionFlash: null });
                } else {
                    req.session.sessionFlash = { type: 'danger', message: 'Página inexistente ou foi excluída !' };
        
                    res.redirect('/admin/pagina/listar');
                }
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/pagina/listar');
            });
        }
    }

    public async update(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        const pageData = req.body;

        pageData.id = parseInt(req.params.id);

        const errors = expressValidator.validationResult(req);

        if (errors.isEmpty() === false) {
            res.render('admin/page/edit', { pageData, sessionUser: req.session, sessionFlash: { type: 'danger', message: errors.array() } });
        } else {
            PageService.update(pageData).then(() => {
                req.session.sessionFlash = { type: 'success', message: 'Página alterada com sucesso...' };

                res.redirect('/admin/pagina/listar');
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/pagina/listar');
            });
        }
    }

    public async delete(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        if (req.session.userTypeId !== 1) {
            req.session.sessionFlash = { type: 'danger', message: 'Usuário não tem permissão para usar esta ação !' };

            res.redirect('/admin/pagina/listar');
        } else {
            const { id } = req.params;

            PageService.getById(parseInt(id)).then(pageData => {
                if (pageData) {
                    res.render('admin/page/delete', { pageData, sessionUser: req.session, sessionFlash: null });
                } else {
                    req.session.sessionFlash = { type: 'danger', message: 'Página inexistente ou foi excluída !' };
        
                    res.redirect('/admin/pagina/listar');
                }
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/pagina/listar');
            });
        }
    }

    public async destroy(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        const { id } = req.params;

        PageService.destroy(parseInt(id)).then(() => {
            req.session.sessionFlash = { type: 'success', message: 'Página excluída com sucesso...' };

            res.redirect('/admin/pagina/listar');
        }).catch(error => {
            req.session.sessionFlash = { type: 'danger', message: error.message };

            res.redirect('/admin/pagina/listar');
        });
    }

    public async show(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        const { id } = req.params;

        PageService.getById(parseInt(id)).then(pageData => {
            if (pageData) {
                res.render('admin/page/show', { pageData, sessionUser: req.session, sessionFlash: null });
            } else {
                req.session.sessionFlash = { type: 'danger', message: 'Página inexistente ou foi excluída !' };
    
                res.redirect('/admin/pagina/listar');
            }
        }).catch(error => {
            req.session.sessionFlash = { type: 'danger', message: error.message };

            res.redirect('/admin/pagina/listar');
        });
    }
}

export default new AdminPageController();
