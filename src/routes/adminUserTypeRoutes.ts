import { Router } from 'express';
import AdminUserTypeController from '../controllers/adminUserTypeController';
import AuthMiddleware from '../middlewares/authMiddleware';
import * as UserTypeValidator from '../validators/userTypeValidator';

const adminUserTypeRouter = Router();

adminUserTypeRouter.get('/listar', AuthMiddleware, AdminUserTypeController.index);
adminUserTypeRouter.get('/editar/:id', AuthMiddleware, AdminUserTypeController.edit);
adminUserTypeRouter.post('/editar/:id', AuthMiddleware, UserTypeValidator.update, AdminUserTypeController.update);
adminUserTypeRouter.get('/consultar/:id', AuthMiddleware, AdminUserTypeController.show);

export default adminUserTypeRouter;
