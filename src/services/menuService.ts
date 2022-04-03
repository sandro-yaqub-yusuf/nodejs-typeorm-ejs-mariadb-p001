import Menu from '../models/Menu';
import { MenuRepository } from '../repositories/menuRepository';

interface IMenuInstance {
    id?: number;
    name: string;
    url: string;
    orderShow: number;
    openAnotherTab?: number;
    siteEnable?: number;
}

class MenuService {
    public async getAll(siteEnable: number = 0, wDeleted: boolean = true, wOrderColumn: string = 'id', wOrderType: string = 'A', wLimit: number = 0, wRandom: boolean = false): Promise<Menu[]> {
        return await MenuRepository.findAllWQB(siteEnable, wDeleted, wOrderColumn, wOrderType, wLimit, wRandom);
    }

    public async getById(id: number): Promise<Menu | null> {
        return await MenuRepository.findByIdWQB(id);
    }

    public async store(menuData: IMenuInstance): Promise<Menu> {
        const menu = MenuRepository.create(menuData);

        menu.openAnotherTab = (menuData.openAnotherTab ? 1 : 0);
        menu.siteEnable = (menuData.siteEnable ? 1 : 0);

        const menuStore = await MenuRepository.saveWT(menu);

        if (!menuStore) throw new Error('Não foi possível cadastrar o Menu !');

        return menuStore;
    }

    public async update(menuData: IMenuInstance): Promise<Menu> {
        const menu = await MenuRepository.findOneBy({ id: menuData.id });

        if (!menu) throw new Error('Menu não encontrado !');
        
        menu.name = menuData.name;
        menu.url = menuData.url;
        menu.orderShow = menuData.orderShow;
        menu.openAnotherTab = (menuData.openAnotherTab ? 1 : 0);
        menu.siteEnable = (menuData.siteEnable ? 1 : 0);

        const menuUpdate = await MenuRepository.saveWT(menu);

        if (!menuUpdate) throw new Error('Não foi possível alterar o Menu !');

        return menuUpdate;
    }

    public async destroy(id: number): Promise<void> {
        const menu = await MenuRepository.findOneBy({ id });

        if (!menu) throw new Error('Menu não encontrado !');

        const menuDelete = await MenuRepository.softDeleteWT(id);

        if (!menuDelete) throw new Error('Não foi possível excluir o Menu !');
    }
}

export default new MenuService();
