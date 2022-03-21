import { dataSource } from '../database';
import Page from '../models/Page';

interface IPageInstance {
    id?: number;
    name: string;
    content?: string;
    orderShow: number;
    openAnotherTab?: number;
    siteEnable?: number;
}

const pageRepository = dataSource.getRepository(Page).extend({
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
        const queryRunner = dataSource.createQueryRunner();
        
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
        const queryRunner = dataSource.createQueryRunner();
        
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

class PageService {
    public async getAll(siteEnable: number = 0, wDeleted: boolean = true, wOrderColumn: string = 'id', wOrderType: string = 'A', wLimit: number = 0, wRandom: boolean = false): Promise<Page[]> {
        return await pageRepository.findAllWQB(siteEnable, wDeleted, wOrderColumn, wOrderType, wLimit, wRandom);
    }

    public async getById(id: number): Promise<Page | null> {
        return await pageRepository.findByIdWQB(id);
    }

    public async store(pageData: IPageInstance): Promise<Page> {
        const page = pageRepository.create(pageData);

        page.content = (pageData.content ? pageData.content : null);
        page.openAnotherTab = (pageData.openAnotherTab ? 1 : 0);
        page.siteEnable = (pageData.siteEnable ? 1 : 0);

        const pageStore = await pageRepository.saveWT(page);

        if (!pageStore) throw new Error('Não foi possível cadastrar a Página !');

        return pageStore;
    }

    public async update(pageData: IPageInstance): Promise<Page> {
        const page = await pageRepository.findOneBy({ id: pageData.id });

        if (!page) throw new Error('Página não encontrada !');
        
        page.name = pageData.name;
        page.content = (pageData.content ? pageData.content : null);
        page.orderShow = pageData.orderShow;
        page.openAnotherTab = (pageData.openAnotherTab ? 1 : 0);
        page.siteEnable = (pageData.siteEnable ? 1 : 0);

        const pageUpdate = await pageRepository.saveWT(page);

        if (!pageUpdate) throw new Error('Não foi possível alterar a Página !');

        return pageUpdate;
    }

    public async destroy(id: number): Promise<void> {
        const page = await pageRepository.findOneBy({ id });

        if (!page) throw new Error('Página não encontrada !');

        const pageDelete = await pageRepository.softDeleteWT(id);

        if (!pageDelete) throw new Error('Não foi possível excluir a Página !');
    }
}

export default new PageService();
