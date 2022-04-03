import express from 'express';
import multer from 'multer';
import uploadConfig from '../configs/upload';
import * as GalleryImageValidator from '../validators/galleryImageValidator';
import AdminGalleryImageController from '../controllers/adminGalleryImageController';
import AuthMiddleware from '../middlewares/authMiddleware';

const adminGalleryImageRouter = express.Router();
const upload = multer(uploadConfig);

adminGalleryImageRouter.get('/listar', AuthMiddleware, AdminGalleryImageController.index);
adminGalleryImageRouter.get('/novo', AuthMiddleware, AdminGalleryImageController.create);
adminGalleryImageRouter.post('/novo', AuthMiddleware, upload.single('customFile'), GalleryImageValidator.store, AdminGalleryImageController.store);
adminGalleryImageRouter.get('/editar/:id', AuthMiddleware, AdminGalleryImageController.edit);
adminGalleryImageRouter.post('/editar/:id', AuthMiddleware, upload.single('customFile'), GalleryImageValidator.update, AdminGalleryImageController.update);
adminGalleryImageRouter.get('/excluir/:id', AuthMiddleware, AdminGalleryImageController.delete);
adminGalleryImageRouter.post('/excluir/:id', AuthMiddleware, AdminGalleryImageController.destroy);
adminGalleryImageRouter.get('/consultar/:id', AuthMiddleware, AdminGalleryImageController.show);

export default adminGalleryImageRouter;
