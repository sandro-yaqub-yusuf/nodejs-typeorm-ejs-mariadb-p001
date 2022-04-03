import UserType from '../models/UserType';
import { UserTypeRepository } from '../repositories/userTypeRepository';

interface IUserTypeInstance {
    id: number;
    name: string;
}

class UserTypeService {
    public async getAll(wDeleted: boolean = true, wOrderColumn: string = 'id', wOrderType: string = 'A', wLimit: number = 0, wRandom: boolean = false): Promise<UserType[]> {
        return await UserTypeRepository.findAllWQB(wDeleted, wOrderColumn, wOrderType, wLimit, wRandom);
    }

    public async getById(id: number): Promise<UserType | null> {
        return await UserTypeRepository.findByIdWQB(id);
    }

    public async update(userTypeData: IUserTypeInstance): Promise<UserType> {
        const userType = await UserTypeRepository.findOneBy({ id: userTypeData.id });

        if (!userType) throw new Error('Tipo de Usuário não encontrado !');
        
        userType.name = userTypeData.name;

        const userTypeUpdate = await UserTypeRepository.saveWT(userType);

        if (!userTypeUpdate) throw new Error('Não foi possível alterar o Tipo de Usuário !');

        return userTypeUpdate;
    }
}

export default new UserTypeService();
