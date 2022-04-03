import express from 'express';
import AdminHomeController from '../controllers/adminHomeController';
import AuthMiddleware from '../middlewares/authMiddleware';

const adminHomeRouter = express.Router();

adminHomeRouter.get('/admin', AuthMiddleware, AdminHomeController.index);

export default adminHomeRouter;
