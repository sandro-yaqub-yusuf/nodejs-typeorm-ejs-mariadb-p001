import express from 'express';
import * as AuthValidator from '../validators/authValidator';
import AdminAuthController from '../controllers/adminAuthController';
import AuthMiddleware from '../middlewares/authMiddleware';

const adminAuthRouter = express.Router();

adminAuthRouter.get('/login', AdminAuthController.login);
adminAuthRouter.post('/login', AuthValidator.login, AdminAuthController.loginAction);
adminAuthRouter.get('/logout', AuthMiddleware, AdminAuthController.logout);

export default adminAuthRouter;
