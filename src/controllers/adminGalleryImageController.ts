import express from 'express';
import sharp from 'sharp';
import * as promises from 'fs/promises';
import * as expressValidator from 'express-validator';
import GalleryImageService from '../services/galleryImageService';

class AdminGalleryImageController {
    public async index(req: express.Request, res: express.Response): Promise<void> {
        const sessionFlash = req.session.sessionFlash;
        
        delete req.session.sessionFlash;

        GalleryImageService.getAll(1).then(galleryImageList => { 
            res.render('admin/galleryImage/index', { galleryImageList, sessionUser: req.session, sessionFlash });
        });
    }

    public async create(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        if (req.session.userTypeId !== 1) {
            req.session.sessionFlash = { type: 'danger', message: 'Usuário não tem permissão para usar esta ação !' };

            res.redirect('/admin/galeria-imagem/listar');
        } else {
            res.render('admin/galleryImage/create', { galleryImageData: null, sessionUser: req.session, sessionFlash: null });
        }
    }

    public async store(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        const galleryImageData = req.body;
        const fileUpload = (req.file ? req.file : null);
        const errors = expressValidator.validationResult(req);

        if (errors.isEmpty() === false) {
            res.render('admin/galleryImage/create', { galleryImageData, sessionUser: req.session, sessionFlash: { type: 'danger', message: errors.array() } });
        } else {
            if (fileUpload) {
                galleryImageData.imageUrl = `${process.env.IMAGE_URL_GALLERY + '/' + fileUpload.filename}`;

                sharp(fileUpload.path)
                    .resize(parseInt(galleryImageData.imageWidth), parseInt(galleryImageData.imageHeight)).toFormat('jpg').toFile(`./${process.env.IMAGE_URL_PUBLIC + galleryImageData.imageUrl}`).then(() => {
                        promises.unlink(fileUpload.path).then(() => {
                            // Salva o dado depois que a imagem redimensionada e transferida para a pasta final
                            GalleryImageService.store(galleryImageData).then(() => {
                                req.session.sessionFlash = { type: 'success', message: 'Imagem cadastrada com sucesso...' };
                
                                res.redirect('/admin/galeria-imagem/listar');
                            }).catch(error => {
                                req.session.sessionFlash = { type: 'danger', message: error.message };
                
                                res.redirect('/admin/galeria-imagem/listar');
                            });
                        }).catch(error => {
                            res.render('admin/galleryImage/create', {
                                galleryImageData,
                                sessionUser: req.session,
                                sessionFlash: { type: 'danger', message: error.message }
                            });
                        });
                    }).catch(error => {
                        res.render('admin/galleryImage/create', {
                            galleryImageData,
                            sessionUser: req.session,
                            sessionFlash: { type: 'danger', message: error.message }
                        });
                    });
            } else {
                res.render('admin/galleryImage/create', {
                    galleryImageData,
                    sessionUser: req.session,
                    sessionFlash: { type: 'danger', message: "Selecione uma imagem válida !" }
                });
            }
        }
    }

    public async edit(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        if (req.session.userTypeId !== 1) {
            req.session.sessionFlash = { type: 'danger', message: 'Usuário não tem permissão para usar esta ação !' };

            res.redirect('/admin/galeria-imagem/listar');
        } else {
            const { id } = req.params;

            GalleryImageService.getById(parseInt(id)).then(galleryImageData => {
                if (galleryImageData) {
                    res.render('admin/galleryImage/edit', { galleryImageData, sessionUser: req.session, sessionFlash: null });
                } else {
                    req.session.sessionFlash = { type: 'danger', message: 'Imagem inexistente ou foi excluída !' };
        
                    res.redirect('/admin/galeria-imagem/listar');
                }
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/galeria-imagem/listar');
            });
        }
    }

    public async update(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        const { id } = req.params;
        const galleryImageData = req.body;

        galleryImageData.id = parseInt(req.params.id);

        const fileUpload = (req.file ? req.file : null);
        const errors = expressValidator.validationResult(req);

        if (errors.isEmpty() === false) {
            res.render('admin/galleryImage/edit', { galleryImageData, sessionUser: req.session, sessionFlash: { type: 'danger', message: errors.array() } });
        } else {
            if (fileUpload) {
                GalleryImageService.getById(parseInt(id)).then(galleryImageData => {
                    if (galleryImageData) {
                        promises.unlink((__dirname.replace('\\src\\controllers', '\\public') + galleryImageData.imageUrl)).then(() => {
                            // Imagem fo excluída com sucesso
                        }).catch(error => {
                            res.render('admin/galleryImage/create', {
                                galleryImageData,
                                sessionUser: req.session,
                                sessionFlash: { type: 'danger', message: error.message }
                            });
                        });
                    } else {
                        req.session.sessionFlash = { type: 'danger', message: 'Imagem inexistente ou foi excluída !' };
            
                        res.redirect('/admin/galeria-imagem/listar');
                    }
                }).catch(error => {
                    req.session.sessionFlash = { type: 'danger', message: error.message };

                    res.redirect('/admin/galeria-imagem/listar');
                });

                galleryImageData.imageUrl = `${process.env.IMAGE_URL_GALLERY + '/' + fileUpload.filename}`;

                sharp(fileUpload.path)
                    .resize(parseInt(galleryImageData.imageWidth), parseInt(galleryImageData.imageHeight)).toFormat('jpg').toFile(`./${process.env.IMAGE_URL_PUBLIC + galleryImageData.imageUrl}`).then(() => {
                        promises.unlink(fileUpload.path).then(() => {
                            // Imagem redimensionada e transferida para a pasta final
                        }).catch(error => {
                            res.render('admin/galleryImage/create', {
                                galleryImageData,
                                sessionUser: req.session,
                                sessionFlash: { type: 'danger', message: error.message }
                            });
                        });
                    }).catch(error => {
                        res.render('admin/galleryImage/create', {
                            galleryImageData,
                            sessionUser: req.session,
                            sessionFlash: { type: 'danger', message: error.message }
                        });
                    });
            }

            GalleryImageService.update(galleryImageData).then(() => {
                req.session.sessionFlash = { type: 'success', message: 'Imagem alterada com sucesso...' };

                res.redirect('/admin/galeria-imagem/listar');
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/galeria-imagem/listar');
            });
        }
    }

    public async delete(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        if (req.session.userTypeId !== 1) {
            req.session.sessionFlash = { type: 'danger', message: 'Usuário não tem permissão para usar esta ação !' };

            res.redirect('/admin/galeria-imagem/listar');
        } else {
            const { id } = req.params;

            GalleryImageService.getById(parseInt(id)).then(galleryImageData => {
                if (galleryImageData) {
                    res.render('admin/galleryImage/delete', { galleryImageData, sessionUser: req.session, sessionFlash: null });
                } else {
                    req.session.sessionFlash = { type: 'danger', message: 'Imagem inexistente ou foi excluída !' };
        
                    res.redirect('/admin/galeria-imagem/listar');
                }
            }).catch(error => {
                req.session.sessionFlash = { type: 'danger', message: error.message };

                res.redirect('/admin/galeria-imagem/listar');
            });
        }
    }

    public async destroy(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        const { id } = req.params;

        GalleryImageService.getById(parseInt(id)).then(galleryImageData => {
            if (galleryImageData) {
                promises.unlink((__dirname.replace('\\src\\controllers', '\\public') + galleryImageData.imageUrl)).then(() => {
                    // Exclui o dado depois que a imagem fo excluída com sucesso
                    GalleryImageService.destroy(parseInt(id)).then(() => {
                        req.session.sessionFlash = { type: 'success', message: 'Imagem excluída com sucesso...' };
        
                        res.redirect('/admin/galeria-imagem/listar');
                    }).catch(error => {
                        req.session.sessionFlash = { type: 'danger', message: error.message };
        
                        res.redirect('/admin/galeria-imagem/listar');
                    });
                }).catch(error => {
                    res.render('admin/galleryImage/create', {
                        galleryImageData,
                        sessionUser: req.session,
                        sessionFlash: { type: 'danger', message: error.message }
                    });
                });
            } else {
                req.session.sessionFlash = { type: 'danger', message: 'Imagem inexistente ou foi excluída !' };
    
                res.redirect('/admin/galeria-imagem/listar');
            }
        }).catch(error => {
            req.session.sessionFlash = { type: 'danger', message: error.message };

            res.redirect('/admin/galeria-imagem/listar');
        });
    }

    public async show(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        const { id } = req.params;

        GalleryImageService.getById(parseInt(id)).then(galleryImageData => {
            if (galleryImageData) {
                res.render('admin/galleryImage/show', { galleryImageData, sessionUser: req.session, sessionFlash: null });
            } else {
                req.session.sessionFlash = { type: 'danger', message: 'Imagem inexistente ou foi excluída !' };
    
                res.redirect('/admin/galeria-imagem/listar');
            }
        }).catch(error => {
            req.session.sessionFlash = { type: 'danger', message: error.message };

            res.redirect('/admin/galeria-imagem/listar');
        });
    }
}

export default new AdminGalleryImageController();
