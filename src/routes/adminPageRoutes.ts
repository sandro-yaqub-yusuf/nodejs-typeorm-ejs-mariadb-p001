import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../configs/upload';
import AdminPageController from '../controllers/adminPageController';
import AuthMiddleware from '../middlewares/authMiddleware';
import * as PageValidator from '../validators/pageValidator';

const adminPageRouter = Router();
const upload = multer(uploadConfig);

adminPageRouter.get('/listar', AuthMiddleware, AdminPageController.index);
adminPageRouter.get('/novo', AuthMiddleware, AdminPageController.create);
adminPageRouter.post('/novo', AuthMiddleware, upload.single('customFile'), PageValidator.store, AdminPageController.store);
adminPageRouter.get('/editar/:id', AuthMiddleware, AdminPageController.edit);
adminPageRouter.post('/editar/:id', AuthMiddleware, upload.single('customFile'), PageValidator.update, AdminPageController.update);
adminPageRouter.get('/excluir/:id', AuthMiddleware, AdminPageController.delete);
adminPageRouter.post('/excluir/:id', AuthMiddleware, AdminPageController.destroy);
adminPageRouter.get('/consultar/:id', AuthMiddleware, AdminPageController.show);

export default adminPageRouter;
