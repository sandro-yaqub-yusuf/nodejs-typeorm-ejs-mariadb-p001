import * as database from '../database';
import Menu from '../models/Menu';

export const MenuRepository = database.dataSource.getRepository(Menu).extend({
    async findAllWQB(siteEnable: number, wDeleted: boolean, wOrderColumn: string, wOrderType: string, wLimit: number, wRandom: boolean): Promise<Menu[]> {
        const query = this.createQueryBuilder('menus');

        query.select();

        if (siteEnable == 1) query.where('menus.site_enable = 1');
        else if (siteEnable == 2) query.where('menus.site_enable = 0');

        if (wDeleted) query.withDeleted();

        if (wRandom) query.orderBy('RAND()');
        else query.orderBy(('menus.' + wOrderColumn), (wOrderType == 'A' ? 'ASC' : 'DESC'));

        if (wLimit > 0) query.take(wLimit);

        return await query.getMany();
    },
    async findByIdWQB(id: number): Promise<Menu | null> {
        const query = this.createQueryBuilder('menus');

        query.select().withDeleted().where('menus.id = :id', { id });

        return await query.getOne();
    },
    async saveWT(menu: Menu): Promise<Menu | null> {
        const queryRunner = database.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        let ok = false;

        try {
            menu = await queryRunner.manager.save(menu);

            await queryRunner.commitTransaction();

            ok = true;
        }
        catch (err) {
            if (process.env.NODE_DEPLOY = 'DEV') console.log(err);

            await queryRunner.rollbackTransaction();

            ok = false;
        }
        finally {
            await queryRunner.release();
        }

        return (ok ? menu : null);
    },
    async softDeleteWT(id: number): Promise<boolean | null> {
        const queryRunner = database.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        let ok = false;

        try {
            await queryRunner.manager.softDelete(Menu, { id });

            await queryRunner.commitTransaction();

            ok = true;
        }
        catch (err) {
            if (process.env.NODE_DEPLOY = 'DEV') console.log(err);

            await queryRunner.rollbackTransaction();

            ok = false;
        }
        finally {
            await queryRunner.release();
        }

        return ok;
    }
});
