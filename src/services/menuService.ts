import { dataSource } from '../database';
import Menu from '../models/Menu';

interface IMenuInstance {
    id?: number;
    name: string;
    url: string;
    orderShow: number;
    openAnotherTab?: number;
    siteEnable?: number;
}

const menuRepository = dataSource.getRepository(Menu).extend({
    async findAllWQB(siteEnable: number, wDeleted: boolean, wOrderColumn: string, wOrderType: string, wLimit: number, wRandom: boolean): Promise<Menu[]> {
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
    },
    async findByIdWQB(id: number): Promise<Menu | null> {
        const query = this.createQueryBuilder('menus');

        query.select().withDeleted().where('menus.id = :id', { id });

        const menu = await query.getOne();

        return menu;
    },
    async saveWT(menu: Menu): Promise<Menu | null> {
        const queryRunner = dataSource.createQueryRunner();
        
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
        const queryRunner = dataSource.createQueryRunner();
        
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

class MenuService {
    public async getAll(siteEnable: number = 0, wDeleted: boolean = true, wOrderColumn: string = 'id', wOrderType: string = 'A', wLimit: number = 0, wRandom: boolean = false): Promise<Menu[]> {
        const menus = await menuRepository.findAllWQB(siteEnable, wDeleted, wOrderColumn, wOrderType, wLimit, wRandom);

        return menus;
    }

    public async getById(id: number): Promise<Menu | null> {
        const menu = await menuRepository.findByIdWQB(id);

        if (!menu) throw new Error('Menu não encontrado !');

        return menu;
    }

    public async store(menuData: IMenuInstance): Promise<Menu | null> {
        const menu = menuRepository.create(menuData);

        menu.openAnotherTab = (menuData.openAnotherTab ? 1 : 0);
        menu.siteEnable = (menuData.siteEnable ? 1 : 0);

        const menuStore = await menuRepository.saveWT(menu);

        if (!menuStore) throw new Error('Não foi possível cadastrar o Menu !');

        return menuStore;
    }

    public async update(menuData: IMenuInstance): Promise<Menu | null> {
        const menu = await menuRepository.findOneBy({ id: menuData.id });

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
        const menu = await menuRepository.findOneBy({ id });

        if (!menu) throw new Error('Menu não encontrado !');

        const menuDelete = await menuRepository.softDeleteWT(id);

        if (!menuDelete) throw new Error('Não foi possível excluir o Menu !');
    }
}

export default new MenuService();
