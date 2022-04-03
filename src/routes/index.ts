import express from 'express';
import AdminAuthRouter from './adminAuthRoutes';
import AdminGalleryImageRouter from './adminGalleryImageRoutes';
import AdminHomeRouter from './adminHomeRoutes';
import AdminMenuRouter from './adminMenuRoutes';
import AdminPageRouter from './adminPageRoutes';
import AdminParameterRouter from './adminParameterRoutes';
import AdminUserRouter from './adminUserRoutes';
import AdminUserTypeRouter from './adminUserTypeRoutes';
import SiteHomeRouter from './siteHomeRoutes';

const routes = express.Router();

routes.use('/', SiteHomeRouter);
routes.use('/', AdminHomeRouter);
routes.use('/admin', AdminAuthRouter);
routes.use('/admin/galeria-imagem', AdminGalleryImageRouter);
routes.use('/admin/menu', AdminMenuRouter);
routes.use('/admin/pagina', AdminPageRouter);
routes.use('/admin/parametro', AdminParameterRouter);
routes.use('/admin/tipo-usuario', AdminUserTypeRouter);
routes.use('/admin/usuario', AdminUserRouter);

export default routes;
