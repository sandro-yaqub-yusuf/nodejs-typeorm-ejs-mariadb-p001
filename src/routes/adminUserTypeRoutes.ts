import express from 'express';
import * as UserTypeValidator from '../validators/userTypeValidator';
import AdminUserTypeController from '../controllers/adminUserTypeController';
import AuthMiddleware from '../middlewares/authMiddleware';

const adminUserTypeRouter = express.Router();

adminUserTypeRouter.get('/listar', AuthMiddleware, AdminUserTypeController.index);
adminUserTypeRouter.get('/editar/:id', AuthMiddleware, AdminUserTypeController.edit);
adminUserTypeRouter.post('/editar/:id', AuthMiddleware, UserTypeValidator.update, AdminUserTypeController.update);
adminUserTypeRouter.get('/consultar/:id', AuthMiddleware, AdminUserTypeController.show);

export default adminUserTypeRouter;
