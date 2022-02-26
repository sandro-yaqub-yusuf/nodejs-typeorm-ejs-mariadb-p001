import { Request, Response } from 'express';

class AdminHomeController {
    public async index(req: Request, res: Response): Promise<void> {
        delete req.session.sessionFlash;

        res.render('admin/dashboard', { sessionUser: req.session });
    }
}

export default new AdminHomeController();
