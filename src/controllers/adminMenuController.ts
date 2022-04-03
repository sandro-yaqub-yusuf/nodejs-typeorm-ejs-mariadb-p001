import express from 'express';
import * as expressValidator from 'express-validator';
import MenuService from '../services/menuService';

class AdminMenuController {
    public async index(req: express.Request, res: express.Response): Promise<void> {
        const sessionFlash = req.session.sessionFlash;
        
        delete req.session.sessionFlash;

        MenuService.getAll().then(menuList => { 
            res.render('admin/menu/index', { menuList, sessionUser: req.session, sessionFlash });
        });
    }

    public async create(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        if (req.session.userTypeId !== 1) {
            req.session.sessionFlash = { type: 'danger', message: 'Usuário não tem permissão para usar esta ação !' };

            res.redirect('/admin/menu/listar');
        } else {
            res.render('admin/menu/create', { menuData: null, sessionUser: req.session, sessionFlash: null });
        }
    }

    public async store(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        const menuData = req.body;
        const errors = expressValidator.validationResult(req);

        if (errors.isEmpty() === false) {
            res.render('admin/menu/create', { menuData, sessionUser: req.session, sessionFlash: { type: 'danger', message: errors.array() } });
        } else {
            MenuService.store(menuData).then(() => {
                req.session.sessionFlash = { type: 'success', message: 'Menu cadastrado com sucesso...' };

                res.redirect('/admin/menu/listar');
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/menu/listar');
            });
        }
    }

    public async edit(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        if (req.session.userTypeId !== 1) {
            req.session.sessionFlash = { type: 'danger', message: 'Usuário não tem permissão para usar esta ação !' };

            res.redirect('/admin/menu/listar');
        } else {
            const { id } = req.params;

            MenuService.getById(parseInt(id)).then(menuData => {
                if (menuData) {
                    res.render('admin/menu/edit', { menuData, sessionUser: req.session, sessionFlash: null });
                } else {
                    req.session.sessionFlash = { type: 'danger', message: 'Menu inexistente ou foi excluído !' };
        
                    res.redirect('/admin/menu/listar');
                }
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/menu/listar');
            });
        }
    }

    public async update(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        const menuData = req.body;

        menuData.id = parseInt(req.params.id);

        const errors = expressValidator.validationResult(req);

        if (errors.isEmpty() === false) {
            res.render('admin/menu/edit', { menuData, sessionUser: req.session, sessionFlash: { type: 'danger', message: errors.array() } });
        } else {
            MenuService.update(menuData).then(() => {
                req.session.sessionFlash = { type: 'success', message: 'Menu alterado com sucesso...' };

                res.redirect('/admin/menu/listar');
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/menu/listar');
            });
        }
    }

    public async delete(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        if (req.session.userTypeId !== 1) {
            req.session.sessionFlash = { type: 'danger', message: 'Usuário não tem permissão para usar esta ação !' };

            res.redirect('/admin/menu/listar');
        } else {
            const { id } = req.params;

            MenuService.getById(parseInt(id)).then(menuData => {
                if (menuData) {
                    res.render('admin/menu/delete', { menuData, sessionUser: req.session, sessionFlash: null });
                } else {
                    req.session.sessionFlash = { type: 'danger', message: 'Menu inexistente ou foi excluído !' };
        
                    res.redirect('/admin/menu/listar');
                }
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/menu/listar');
            });
        }
    }

    public async destroy(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        const { id } = req.params;

        MenuService.destroy(parseInt(id)).then(() => {
            req.session.sessionFlash = { type: 'success', message: 'Menu excluído com sucesso...' };

            res.redirect('/admin/menu/listar');
        }).catch(error => {
            req.session.sessionFlash = { type: 'danger', message: error.message };

            res.redirect('/admin/menu/listar');
        });
    }

    public async show(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        const { id } = req.params;

        MenuService.getById(parseInt(id)).then(menuData => {
            if (menuData) {
                res.render('admin/menu/show', { menuData, sessionUser: req.session, sessionFlash: null });
            } else {
                req.session.sessionFlash = { type: 'danger', message: 'Menu inexistente ou foi excluído !' };
    
                res.redirect('/admin/menu/listar');
            }
        }).catch(error => {
            req.session.sessionFlash = { type: 'danger', message: error.message };

            res.redirect('/admin/menu/listar');
        });
    }
}

export default new AdminMenuController();
