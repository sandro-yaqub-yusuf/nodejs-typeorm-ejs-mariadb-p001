import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { unlink } from 'fs/promises';
import sharp from 'sharp';
import UserService from '../services/userService';
import UserTypeService from '../services/userTypeService';

class AdminUserController {
    public async index(req: Request, res: Response): Promise<void> {
        const sessionFlash = req.session.sessionFlash;
        
        delete req.session.sessionFlash;

        UserService.getAll(true).then(userList => { 
            res.render('admin/user/index', { userList, sessionUser: req.session, sessionFlash });
        });
    }
    
    public async create(req: Request, res: Response): Promise<void> {
        delete req.session.sessionFlash;

        const userTypeList = await UserTypeService.getAll();

        if (req.session.userTypeId !== 1) {
            req.session.sessionFlash = { type: 'danger', message: 'Usuário não tem permissão para usar esta ação !' };

            res.redirect('/admin/usuario/listar');
        } else {
            res.render('admin/user/create', { userData: null, userTypeList, sessionUser: req.session, sessionFlash: null });
        }
    }

    public async store(req: Request, res: Response): Promise<void> {
        delete req.session.sessionFlash;

        const userData = req.body;
        const userTypeList = await UserTypeService.getAll();
        const fileUpload = (req.file ? req.file : null);
        const errors = validationResult(req);

        if (errors.isEmpty() === false) {
            res.render('admin/user/create', { userData, userTypeList, sessionUser: req.session, sessionFlash: { type: 'danger', message: errors.array() } });
        } else {
            if (fileUpload) {
                userData.imageUrl = `${process.env.IMAGE_URL_GALLERY + '/' + fileUpload.filename}`;

                sharp(fileUpload.path)
                    .resize(200, 200).toFormat('jpg').toFile(`./${process.env.IMAGE_URL_PUBLIC + userData.imageUrl}`).then(() => {
                        unlink(fileUpload.path).then(() => {
                            // Imagem redimensionada e transferida para a pasta final
                        }).catch(error => {
                            res.render('admin/user/create', {
                                userData,
                                userTypeList,
                                sessionUser: req.session,
                                sessionFlash: { type: 'danger', message: error.message }
                            });
                        });
                    }).catch(error => {
                        res.render('admin/user/create', {
                            userData,
                            userTypeList,
                            sessionUser: req.session,
                            sessionFlash: { type: 'danger', message: error.message }
                        });
                    });
            } else {
                userData.image = 'admin/user.jpg';
            }

            UserService.store(userData).then(() => {
                req.session.sessionFlash = { type: 'success', message: 'Usuário cadastrado com sucesso...' };

                res.redirect('/admin/usuario/listar');
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/usuario/listar');
            });
        }
    }

    public async edit(req: Request, res: Response): Promise<void> {
        delete req.session.sessionFlash;

        if (req.session.userTypeId !== 1) {
            req.session.sessionFlash = { type: 'danger', message: 'Usuário não tem permissão para usar esta ação !' };

            res.redirect('/admin/usuario/listar');
        } else {
            const { id } = req.params;

            const userTypeList = await UserTypeService.getAll();

            UserService.getById(parseInt(id), true).then(userData => {
                if (userData) {
                    res.render('admin/user/edit', { userData, userTypeList, sessionUser: req.session, sessionFlash: null });
                } else {
                    req.session.sessionFlash = { type: 'danger', message: 'Usuário inexistente ou foi excluído !' };
        
                    res.redirect('/admin/usuario/listar');
                }
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/usuario/listar');
            });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        delete req.session.sessionFlash;

        const userData = req.body;

        userData.id = parseInt(req.params.id);

        const userTypeList = await UserTypeService.getAll();
        const fileUpload = (req.file ? req.file : null);
        const errors = validationResult(req);

        if (errors.isEmpty() === false) {
            res.render('admin/user/edit', { userData, userTypeList, sessionUser: req.session, sessionFlash: { type: 'danger', message: errors.array() } });
        } else {
            if (fileUpload) {
                userData.imageUrl = `${process.env.IMAGE_URL_GALLERY + '/' + fileUpload.filename}`;

                sharp(fileUpload.path)
                    .resize(200, 200).toFormat('jpg').toFile(`./${process.env.IMAGE_URL_PUBLIC + userData.imageUrl}`).then(() => {
                        unlink(fileUpload.path).then(() => {
                            // Imagem redimensionada e transferida para a pasta final
                        }).catch(error => {
                            res.render('admin/user/edit', {
                                userData,
                                userTypeList,
                                sessionUser: req.session,
                                sessionFlash: { type: 'danger', message: error.message }
                            });
                        });
                    }).catch(error => {
                        res.render('admin/user/edit', {
                            userData,
                            userTypeList,
                            sessionUser: req.session,
                            sessionFlash: { type: 'danger', message: error.message }
                        });
                    });
            }

            UserService.update(userData).then(() => {
                req.session.sessionFlash = { type: 'success', message: 'Usuário alterado com sucesso...' };

                res.redirect('/admin/usuario/listar');
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/usuario/listar');
            });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        delete req.session.sessionFlash;

        if (req.session.userTypeId !== 1) {
            req.session.sessionFlash = { type: 'danger', message: 'Usuário não tem permissão para usar esta ação !' };

            res.redirect('/admin/usuario/listar');
        } else {
            const { id } = req.params;

            UserService.getById(parseInt(id), true).then(userData => {
                if (userData) {
                    res.render('admin/user/delete', { userData, sessionUser: req.session });
                } else {
                    req.session.sessionFlash = { type: 'danger', message: 'Usuário inexistente ou foi excluído !' };
        
                    res.redirect('/admin/usuario/listar');
                }
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/usuario/listar');
            });
        }
    }

    public async destroy(req: Request, res: Response): Promise<void> {
        delete req.session.sessionFlash;

        const { id } = req.params;

        UserService.destroy(parseInt(id)).then(() => {
            req.session.sessionFlash = { type: 'success', message: 'Usuário excluído com sucesso...' };

            res.redirect('/admin/usuario/listar');
        }).catch(error => {
            req.session.sessionFlash = { type: 'danger', message: error.message };

            res.redirect('/admin/usuario/listar');
        });
    }

    public async show(req: Request, res: Response): Promise<void> {
        delete req.session.sessionFlash;

        const { id } = req.params;

        UserService.getById(parseInt(id), true).then(userData => {
            if (userData) {
                res.render('admin/user/show', { userData, sessionUser: req.session, sessionFlash: null });
            } else {
                req.session.sessionFlash = { type: 'danger', message: 'Usuário inexistente ou foi excluído !' };
    
                res.redirect('/admin/usuario/listar');
            }
        }).catch(error => {
            req.session.sessionFlash = { type: 'danger', message: error.message };

            res.redirect('/admin/usuario/listar');
        });
    }
}

export default new AdminUserController();
