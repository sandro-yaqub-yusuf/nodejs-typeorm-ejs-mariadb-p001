import Page from '../models/Page';
import { PageRepository } from '../repositories/pageRepository';

interface IPageInstance {
    id?: number;
    name: string;
    content?: string;
    orderShow: number;
    openAnotherTab?: number;
    siteEnable?: number;
}

class PageService {
    public async getAll(siteEnable: number = 0, wDeleted: boolean = true, wOrderColumn: string = 'id', wOrderType: string = 'A', wLimit: number = 0, wRandom: boolean = false): Promise<Page[]> {
        return await PageRepository.findAllWQB(siteEnable, wDeleted, wOrderColumn, wOrderType, wLimit, wRandom);
    }

    public async getById(id: number): Promise<Page | null> {
        return await PageRepository.findByIdWQB(id);
    }

    public async store(pageData: IPageInstance): Promise<Page> {
        const page = PageRepository.create(pageData);

        page.content = (pageData.content ? pageData.content : null);
        page.openAnotherTab = (pageData.openAnotherTab ? 1 : 0);
        page.siteEnable = (pageData.siteEnable ? 1 : 0);

        const pageStore = await PageRepository.saveWT(page);

        if (!pageStore) throw new Error('Não foi possível cadastrar a Página !');

        return pageStore;
    }

    public async update(pageData: IPageInstance): Promise<Page> {
        const page = await PageRepository.findOneBy({ id: pageData.id });

        if (!page) throw new Error('Página não encontrada !');
        
        page.name = pageData.name;
        page.content = (pageData.content ? pageData.content : null);
        page.orderShow = pageData.orderShow;
        page.openAnotherTab = (pageData.openAnotherTab ? 1 : 0);
        page.siteEnable = (pageData.siteEnable ? 1 : 0);

        const pageUpdate = await PageRepository.saveWT(page);

        if (!pageUpdate) throw new Error('Não foi possível alterar a Página !');

        return pageUpdate;
    }

    public async destroy(id: number): Promise<void> {
        const page = await PageRepository.findOneBy({ id });

        if (!page) throw new Error('Página não encontrada !');

        const pageDelete = await PageRepository.softDeleteWT(id);

        if (!pageDelete) throw new Error('Não foi possível excluir a Página !');
    }
}

export default new PageService();
