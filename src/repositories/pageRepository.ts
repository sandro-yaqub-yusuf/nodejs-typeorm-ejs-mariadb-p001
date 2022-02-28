import { EntityRepository, getConnection, Repository } from 'typeorm';
import Page from '../models/Page';

@EntityRepository(Page)
export default class PageRepository extends Repository<Page> {
    public async findAllWQB(siteEnable: number, wDeleted: boolean, wOrderColumn: string, wOrderType: string, wLimit: number, wRandom: boolean): Promise<Page[]> {
        const query = this.createQueryBuilder('pages');

        query.select(['pages.id', 'pages.name', 'pages.orderShow', 'pages.openAnotherTab', 'pages.siteEnable', 'pages.createdAt', 'pages.updatedAt', 'pages.deletedAt']);

        if (siteEnable == 1) query.where('pages.site_enable = 1');
        else if (siteEnable == 2) query.where('pages.site_enable = 0');

        if (wDeleted) query.withDeleted();

        if (wRandom) query.orderBy('RAND()');
        else query.orderBy(('pages.' + wOrderColumn), (wOrderType == 'A' ? 'ASC' : 'DESC'));

        if (wLimit > 0) query.take(wLimit);

        const pages = await query.getMany();

        return pages;
    }

    public async findByIdWQB(id: number): Promise<Page | undefined> {
        const query = this.createQueryBuilder('pages');

        query.select().withDeleted().where('pages.id = :id', { id });

        const page = await query.getOne();

        return page;
    }

    public async saveWT(page: Page): Promise<Page | unknown> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        
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
    }

    public async softDeleteWT(id: number): Promise<boolean | unknown> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        
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
}
