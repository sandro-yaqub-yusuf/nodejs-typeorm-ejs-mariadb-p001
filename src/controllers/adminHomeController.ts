import express from 'express';

class AdminHomeController {
    public async index(req: express.Request, res: express.Response): Promise<void> {
        delete req.session.sessionFlash;

        res.render('admin/dashboard', { sessionUser: req.session });
    }
}

export default new AdminHomeController();
