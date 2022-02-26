import { Router } from 'express';
import AdminHomeController from '../controllers/adminHomeController';
import AuthMiddleware from '../middlewares/authMiddleware';

const adminHomeRouter = Router();

adminHomeRouter.get('/admin', AuthMiddleware, AdminHomeController.index);

export default adminHomeRouter;
