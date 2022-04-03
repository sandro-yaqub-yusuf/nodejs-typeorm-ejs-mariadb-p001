import express from 'express';
import ParameterService from '../services/parameterService';

class AdminParameterController {
    public async index(req: express.Request, res: express.Response): Promise<void> {
        const sessionFlash = req.session.sessionFlash;
        
        delete req.session.sessionFlash;

        ParameterService.getAll().then(parameterList => { 
            res.render('admin/parameter/index', { parameterList, sessionUser: req.session, sessionFlash });
        });
    }

    public async edit(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        if (req.session.userTypeId !== 1) {
            req.session.sessionFlash = { type: 'danger', message: 'Usuário não tem permissão para usar esta ação !' };

            res.redirect('/admin/parametro/listar');
        } else {
            const { id } = req.params;

            ParameterService.getById(parseInt(id)).then(parameterData => {
                if (parameterData) {
                    res.render('admin/parameter/edit', { parameterData, sessionUser: req.session, sessionFlash: null });
                } else {
                    req.session.sessionFlash = { type: 'danger', message: 'Parâmetro inexistente ou foi excluído !' };
        
                    res.redirect('/admin/parametro/listar');
                }
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/parametro/listar');
            });
        }
    }

    public async update(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        const parameterData = req.body;

        parameterData.id = parseInt(req.params.id);

        ParameterService.update(parameterData).then(() => {
            req.session.sessionFlash = { type: 'success', message: 'Parâmetro alterado com sucesso...' };

            res.redirect('/admin/parametro/listar');
        }).catch(error => {
            req.session.sessionFlash = { type: 'danger', message: error.message };

            res.redirect('/admin/parametro/listar');
        });
    }

    public async show(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        const { id } = req.params;

        ParameterService.getById(parseInt(id)).then(parameterData => {
            if (parameterData) {
                res.render('admin/parameter/show', { parameterData, sessionUser: req.session, sessionFlash: null });
            } else {
                req.session.sessionFlash = { type: 'danger', message: 'Parâmetro inexistente ou foi excluído !' };
    
                res.redirect('/admin/parametro/listar');
            }
        }).catch(error => {
            req.session.sessionFlash = { type: 'danger', message: error.message };

            res.redirect('/admin/parametro/listar');
        });
    }
}

export default new AdminParameterController();
