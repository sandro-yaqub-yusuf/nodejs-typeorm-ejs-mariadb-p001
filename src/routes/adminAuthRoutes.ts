import { Router } from 'express';
import AdminAuthController from '../controllers/adminAuthController';
import AuthMiddleware from '../middlewares/authMiddleware';
import * as AuthValidator from '../validators/authValidator';

const adminAuthRouter = Router();

adminAuthRouter.get('/login', AdminAuthController.login);
adminAuthRouter.post('/login', AuthValidator.login, AdminAuthController.loginAction);
adminAuthRouter.get('/logout', AuthMiddleware, AdminAuthController.logout);

export default adminAuthRouter;
