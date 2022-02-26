import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import UserTypeService from '../services/userTypeService';

class AdminUserTypeController {
    public async index(req: Request, res: Response): Promise<void> {
        const sessionFlash = req.session.sessionFlash;
        
        delete req.session.sessionFlash;

        UserTypeService.getAll().then(userTypeList => { 
            res.render('admin/userType/index', { userTypeList, sessionUser: req.session, sessionFlash });
        });
    }

    public async edit(req: Request, res: Response): Promise<void> {
        delete req.session.sessionFlash;

        if (req.session.userTypeId !== 1) {
            req.session.sessionFlash = { type: 'danger', message: 'Usuário não tem permissão para usar esta ação !' };

            res.redirect('/admin/tipo-usuario/listar');
        } else {
            const { id } = req.params;

            UserTypeService.getById(parseInt(id)).then(userTypeData => {
                if (userTypeData) {
                    res.render('admin/userType/edit', { userTypeData, sessionUser: req.session, sessionFlash: null });
                } else {
                    req.session.sessionFlash = { type: 'danger', message: 'Tipo de Usuário inexistente ou foi excluído !' };
        
                    res.redirect('/admin/tipo-usuario/listar');
                }
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/tipo-usuario/listar');
            });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        delete req.session.sessionFlash;

        const userTypeData = req.body;

        userTypeData.id = parseInt(req.params.id);

        const errors = validationResult(req);

        if (errors.isEmpty() === false) {
            res.render('admin/userType/edit', { userTypeData, sessionUser: req.session, sessionFlash: { type: 'danger', message: errors.array() } });
        } else {
            UserTypeService.update(userTypeData).then(() => {
                req.session.sessionFlash = { type: 'success', message: 'Tipo de Usuário alterado com sucesso...' };

                res.redirect('/admin/tipo-usuario/listar');
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/tipo-usuario/listar');
            });
        }
    }

    public async show(req: Request, res: Response): Promise<void> {
        delete req.session.sessionFlash;

        const { id } = req.params;

        UserTypeService.getById(parseInt(id)).then(userTypeData => {
            if (userTypeData) {
                res.render('admin/userType/show', { userTypeData, sessionUser: req.session, sessionFlash: null });
            } else {
                req.session.sessionFlash = { type: 'danger', message: 'Tipo de Usuário inexistente ou foi excluído !' };
    
                res.redirect('/admin/tipo-usuario/listar');
            }
        }).catch(error => {
            req.session.sessionFlash = { type: 'danger', message: error.message };

            res.redirect('/admin/tipo-usuario/listar');
        });
    }
}

export default new AdminUserTypeController();
