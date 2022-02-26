import { Router } from 'express';
import AdminMenuController from '../controllers/adminMenuController';
import AuthMiddleware from '../middlewares/authMiddleware';
import * as MenuValidator from '../validators/menuValidator';

const adminMenuRouter = Router();

adminMenuRouter.get('/listar', AuthMiddleware, AdminMenuController.index);
adminMenuRouter.get('/novo', AuthMiddleware, AdminMenuController.create);
adminMenuRouter.post('/novo', AuthMiddleware, MenuValidator.store, AdminMenuController.store);
adminMenuRouter.get('/editar/:id', AuthMiddleware, AdminMenuController.edit);
adminMenuRouter.post('/editar/:id', AuthMiddleware, MenuValidator.update, AdminMenuController.update);
adminMenuRouter.get('/excluir/:id', AuthMiddleware, AdminMenuController.delete);
adminMenuRouter.post('/excluir/:id', AuthMiddleware, AdminMenuController.destroy);
adminMenuRouter.get('/consultar/:id', AuthMiddleware, AdminMenuController.show);

export default adminMenuRouter;
