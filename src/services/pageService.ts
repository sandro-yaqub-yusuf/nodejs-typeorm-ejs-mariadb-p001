import { getCustomRepository } from 'typeorm';
import Page from '../models/Page';
import PageRepository from '../repositories/pageRepository';

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
        const pageRepository = getCustomRepository(PageRepository);

        const pages = await pageRepository.findAllWQB(siteEnable, wDeleted, wOrderColumn, wOrderType, wLimit, wRandom);

        return pages;
    }

    public async getById(id: number): Promise<Page | undefined> {
        const pageRepository = getCustomRepository(PageRepository);

        const page = await pageRepository.findByIdWQB(id);

        if (!page) throw new Error('Página não encontrada !');

        return page;
    }

    public async store(pageData: IPageInstance): Promise<Page | unknown> {
        const pageRepository = getCustomRepository(PageRepository);

        const page = pageRepository.create(pageData);

        page.content = (pageData.content ? pageData.content : null);
        page.openAnotherTab = (pageData.openAnotherTab ? 1 : 0);
        page.siteEnable = (pageData.siteEnable ? 1 : 0);

        const pageStore = await pageRepository.saveWT(page);

        if (!pageStore) throw new Error('Não foi possível cadastrar a Página !');

        return pageStore;
    }

    public async update(pageData: IPageInstance): Promise<Page | unknown> {
        const pageRepository = getCustomRepository(PageRepository);

        const page = await pageRepository.findOne(pageData.id);

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
        const pageRepository = getCustomRepository(PageRepository);

        const page = await pageRepository.findOne(id);

        if (!page) throw new Error('Página não encontrada !');

        const pageDelete = await pageRepository.softDeleteWT(id);

        if (!pageDelete) throw new Error('Não foi possível excluir a Página !');
    }
}

export default new PageService();
