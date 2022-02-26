import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../configs/upload';
import AdminUserController from '../controllers/adminUserController';
import AuthMiddleware from '../middlewares/authMiddleware';
import * as UserValidator from '../validators/userValidator';

const adminUserRouter = Router();
const upload = multer(uploadConfig);

adminUserRouter.get('/listar', AuthMiddleware, AdminUserController.index);
adminUserRouter.get('/novo', AuthMiddleware, AdminUserController.create);
adminUserRouter.post('/novo', AuthMiddleware, upload.single('customFile'), UserValidator.store, AdminUserController.store);
adminUserRouter.get('/editar/:id', AuthMiddleware, AdminUserController.edit);
adminUserRouter.post('/editar/:id', AuthMiddleware, upload.single('customFile'), UserValidator.update, AdminUserController.update);
adminUserRouter.get('/excluir/:id', AuthMiddleware, AdminUserController.delete);
adminUserRouter.post('/excluir/:id', AuthMiddleware, AdminUserController.destroy);
adminUserRouter.get('/consultar/:id', AuthMiddleware, AdminUserController.show);

export default adminUserRouter;
