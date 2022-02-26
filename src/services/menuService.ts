import { getCustomRepository } from 'typeorm';
import menu from '../models/Menu';
import MenuRepository from '../repositories/menuRepository';

interface IMenuInstance {
    id?: number;
    name: string;
    url: string;
    orderShow: number;
    openAnotherTab?: number;
    siteEnable?: number;
}

class MenuService {
    public async getAll(siteEnable: number = 0, wDeleted: boolean = true, wOrderColumn: string = 'id', wOrderType: string = 'A', wLimit: number = 0, wRandom: boolean = false): Promise<menu[]> {
        const menuRepository = getCustomRepository(MenuRepository);

        const menus = await menuRepository.findAllWQB(siteEnable, wDeleted, wOrderColumn, wOrderType, wLimit, wRandom);

        return menus;
    }

    public async getById(id: number): Promise<menu | undefined> {
        const menuRepository = getCustomRepository(MenuRepository);

        const menu = await menuRepository.findByIdWQB(id);

        if (!menu) throw new Error('Menu não encontrado !');

        return menu;
    }

    public async store(menuData: IMenuInstance): Promise<menu | unknown> {
        const menuRepository = getCustomRepository(MenuRepository);

        const menu = menuRepository.create(menuData);

        menu.openAnotherTab = (menuData.openAnotherTab ? 1 : 0);
        menu.siteEnable = (menuData.siteEnable ? 1 : 0);

        const menuStore = await menuRepository.saveWT(menu);

        if (!menuStore) throw new Error('Não foi possível cadastrar o Menu !');

        return menuStore;
    }

    public async update(menuData: IMenuInstance): Promise<menu | unknown> {
        const menuRepository = getCustomRepository(MenuRepository);

        const menu = await menuRepository.findOne(menuData.id);

        if (!menu) throw new Error('Menu não encontrado !');
        
        menu.name = menuData.name;
        menu.url = menuData.url;
        menu.orderShow = menuData.orderShow;
        menu.openAnotherTab = (menuData.openAnotherTab ? 1 : 0);
        menu.siteEnable = (menuData.siteEnable ? 1 : 0);

        const menuUpdate = await menuRepository.saveWT(menu);

        if (!menuUpdate) throw new Error('Não foi possível alterar o Menu !');

        return menuUpdate;
    }

    public async destroy(id: number): Promise<void> {
        const menuRepository = getCustomRepository(MenuRepository);

        const menu = await menuRepository.findOne(id);

        if (!menu) throw new Error('Menu não encontrado !');

        const menuDelete = await menuRepository.softDeleteWT(id);

        if (!menuDelete) throw new Error('Não foi possível excluir o Menu !');
    }
}

export default new MenuService();
