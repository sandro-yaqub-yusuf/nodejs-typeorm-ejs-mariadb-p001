import { dataSource } from '../database';
import UserType from '../models/UserType';

interface IUserTypeInstance {
    id: number;
    name: string;
}

const userTypeRepository = dataSource.getRepository(UserType).extend({
    async findAllWQB(wDeleted: boolean, wOrderColumn: string, wOrderType: string, wLimit: number, wRandom: boolean): Promise<UserType[]> {
        const query = this.createQueryBuilder('usersTypes');

        query.select();

        if (wDeleted) query.withDeleted();

        if (wRandom) query.orderBy('RAND()');
        else query.orderBy(('usersTypes.' + wOrderColumn), (wOrderType == 'A' ? 'ASC' : 'DESC'));

        if (wLimit > 0) query.take(wLimit);

        return await query.getMany();
    },
    async findByIdWQB(id: number): Promise<UserType | null> {
        const query = this.createQueryBuilder('usersTypes');

        query.select().withDeleted().where('usersTypes.id = :id', { id });

        return await query.getOne();
    },
    async saveWT(userType: UserType): Promise<UserType | null> {
        const queryRunner = dataSource.createQueryRunner();
        
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        let ok = false;

        try {
            userType = await queryRunner.manager.save(userType);

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
        
        return (ok ? userType : null);
    }    
});

class UserTypeService {
    public async getAll(wDeleted: boolean = true, wOrderColumn: string = 'id', wOrderType: string = 'A', wLimit: number = 0, wRandom: boolean = false): Promise<UserType[]> {
        return await userTypeRepository.findAllWQB(wDeleted, wOrderColumn, wOrderType, wLimit, wRandom);
    }

    public async getById(id: number): Promise<UserType | null> {
        return await userTypeRepository.findByIdWQB(id);
    }

    public async update(userTypeData: IUserTypeInstance): Promise<UserType> {
        const userType = await userTypeRepository.findOneBy({ id: userTypeData.id });

        if (!userType) throw new Error('Tipo de Usuário não encontrado !');
        
        userType.name = userTypeData.name;

        const userTypeUpdate = await userTypeRepository.saveWT(userType);

        if (!userTypeUpdate) throw new Error('Não foi possível alterar o Tipo de Usuário !');

        return userTypeUpdate;
    }
}

export default new UserTypeService();
