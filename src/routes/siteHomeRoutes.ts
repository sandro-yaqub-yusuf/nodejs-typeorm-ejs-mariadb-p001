import { Router } from 'express';
import SiteHomeController from '../controllers/siteHomeController';

const siteHomeRouter = Router();

siteHomeRouter.get('/', SiteHomeController.index);
siteHomeRouter.get('/pagina/:id', SiteHomeController.page);
siteHomeRouter.post('/enviar-email/fale-conosco', SiteHomeController.sendEmailContact);

export default siteHomeRouter;
