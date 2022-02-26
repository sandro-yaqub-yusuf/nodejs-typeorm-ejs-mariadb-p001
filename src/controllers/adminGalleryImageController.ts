import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { unlink } from 'fs/promises';
import sharp from 'sharp';
import GalleryImageService from '../services/galleryImageService';

class AdminGalleryImageController {
    public async index(req: Request, res: Response): Promise<void> {
        const sessionFlash = req.session.sessionFlash;
        
        delete req.session.sessionFlash;

        GalleryImageService.getAll(1).then(galleryImageList => { 
            res.render('admin/galleryImage/index', { galleryImageList, sessionUser: req.session, sessionFlash });
        });
    }

    public async create(req: Request, res: Response): Promise<void> {
        delete req.session.sessionFlash;

        if (req.session.userTypeId !== 1) {
            req.session.sessionFlash = { type: 'danger', message: 'Usuário não tem permissão para usar esta ação !' };

            res.redirect('/admin/galeria-imagem/listar');
        } else {
            res.render('admin/galleryImage/create', { galleryImageData: null, sessionUser: req.session, sessionFlash: null });
        }
    }

    public async store(req: Request, res: Response): Promise<void> {
        delete req.session.sessionFlash;

        const galleryImageData = req.body;
        const fileUpload = (req.file ? req.file : null);
        const errors = validationResult(req);

        if (errors.isEmpty() === false) {
            res.render('admin/galleryImage/create', { galleryImageData, sessionUser: req.session, sessionFlash: { type: 'danger', message: errors.array() } });
        } else {
            if (fileUpload) {
                galleryImageData.imageUrl = `${process.env.IMAGE_URL_GALLERY + '/' + fileUpload.filename}`;

                sharp(fileUpload.path)
                    .resize(parseInt(galleryImageData.imageWidth), parseInt(galleryImageData.imageHeight)).toFormat('jpg').toFile(`./${process.env.IMAGE_URL_PUBLIC + galleryImageData.imageUrl}`).then(() => {
                        unlink(fileUpload.path).then(() => {
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

    public async edit(req: Request, res: Response): Promise<void> {
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

    public async update(req: Request, res: Response): Promise<void> {
        delete req.session.sessionFlash;

        const { id } = req.params;
        const galleryImageData = req.body;

        galleryImageData.id = parseInt(req.params.id);

        const fileUpload = (req.file ? req.file : null);
        const errors = validationResult(req);

        if (errors.isEmpty() === false) {
            res.render('admin/galleryImage/edit', { galleryImageData, sessionUser: req.session, sessionFlash: { type: 'danger', message: errors.array() } });
        } else {
            if (fileUpload) {
                GalleryImageService.getById(parseInt(id)).then(galleryImageData => {
                    if (galleryImageData) {
                        unlink((__dirname.replace('\\src\\controllers', '\\public') + galleryImageData.imageUrl)).then(() => {
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
                        unlink(fileUpload.path).then(() => {
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

    public async delete(req: Request, res: Response): Promise<void> {
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

    public async destroy(req: Request, res: Response): Promise<void> {
        delete req.session.sessionFlash;

        const { id } = req.params;

        GalleryImageService.getById(parseInt(id)).then(galleryImageData => {
            if (galleryImageData) {
                unlink((__dirname.replace('\\src\\controllers', '\\public') + galleryImageData.imageUrl)).then(() => {
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

    public async show(req: Request, res: Response): Promise<void> {
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
