import * as database from '../database';
import Page from '../models/Page';

export const PageRepository = database.dataSource.getRepository(Page).extend({
    async findAllWQB(siteEnable: number, wDeleted: boolean, wOrderColumn: string, wOrderType: string, wLimit: number, wRandom: boolean): Promise<Page[]> {
        const query = this.createQueryBuilder('pages');

        query.select(['pages.id', 'pages.name', 'pages.orderShow', 'pages.openAnotherTab', 'pages.siteEnable', 'pages.createdAt', 'pages.updatedAt', 'pages.deletedAt']);

        if (siteEnable == 1) query.where('pages.site_enable = 1');
        else if (siteEnable == 2) query.where('pages.site_enable = 0');

        if (wDeleted) query.withDeleted();

        if (wRandom) query.orderBy('RAND()');
        else query.orderBy(('pages.' + wOrderColumn), (wOrderType == 'A' ? 'ASC' : 'DESC'));

        if (wLimit > 0) query.take(wLimit);

        return await query.getMany();
    },
    async findByIdWQB(id: number): Promise<Page | null> {
        const query = this.createQueryBuilder('pages');

        query.select().withDeleted().where('pages.id = :id', { id });

        return await query.getOne();
    },
    async saveWT(page: Page): Promise<Page | null> {
        const queryRunner = database.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        let ok = false;

        try {
            page = await queryRunner.manager.save(page);

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

        return (ok ? page : null);
    },
    async softDeleteWT(id: number): Promise<boolean | null> {
        const queryRunner = database.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        let ok = false;

        try {
            await queryRunner.manager.softDelete(Page, { id });

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
