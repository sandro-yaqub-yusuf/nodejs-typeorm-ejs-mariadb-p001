import { EntityRepository, getConnection, Repository } from 'typeorm';
import Menu from '../models/Menu';

@EntityRepository(Menu)
export default class MenuRepository extends Repository<Menu> {
    public async findAllWQB(siteEnable: number, wDeleted: boolean, wOrderColumn: string, wOrderType: string, wLimit: number, wRandom: boolean): Promise<Menu[]> {
        const query = this.createQueryBuilder('menus');

        query.select();

        if (siteEnable == 1) query.where('menus.site_enable = 1');
        else if (siteEnable == 2) query.where('menus.site_enable = 0');

        if (wDeleted) query.withDeleted();

        if (wRandom) query.orderBy('RAND()');
        else query.orderBy(('menus.' + wOrderColumn), (wOrderType == 'A' ? 'ASC' : 'DESC'));

        if (wLimit > 0) query.take(wLimit);

        const menus = await query.getMany();

        return menus;
    }

    public async findByIdWQB(id: number): Promise<Menu | undefined> {
        const query = this.createQueryBuilder('menus');

        query.withDeleted();

        query.where('menus.id = :id', { id })

        const menu = await query.getOne();

        return menu;
    }

    public async saveWT(menu: Menu): Promise<Menu | unknown> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        
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
    }

    public async softDeleteWT(id: number): Promise<boolean | unknown> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        
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
}
