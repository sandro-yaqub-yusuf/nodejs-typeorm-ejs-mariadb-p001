import express from 'express';
import AdminParameterController from '../controllers/adminParameterController';
import AuthMiddleware from '../middlewares/authMiddleware';

const adminParameterRouter = express.Router();

adminParameterRouter.get('/listar', AuthMiddleware, AdminParameterController.index);
adminParameterRouter.get('/editar/:id', AuthMiddleware, AdminParameterController.edit);
adminParameterRouter.post('/editar/:id', AuthMiddleware, AdminParameterController.update);
adminParameterRouter.get('/consultar/:id', AuthMiddleware, AdminParameterController.show);

export default adminParameterRouter;
