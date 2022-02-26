import { getCustomRepository } from 'typeorm';
import UserType from '../models/UserType';
import UserTypeRepository from '../repositories/userTypeRepository';

interface IUserTypeInstance {
    id: number;
    name: string;
}

class UserTypeService {
    public async getAll(wDeleted: boolean = true, wOrderColumn: string = 'id', wOrderType: string = 'A', wLimit: number = 0, wRandom: boolean = false): Promise<UserType[]> {
        const userTypeRepository = getCustomRepository(UserTypeRepository);

        const usersTypes = await userTypeRepository.findAllWQB(wDeleted, wOrderColumn, wOrderType, wLimit, wRandom);

        return usersTypes;
    }

    public async getById(id: number): Promise<UserType | undefined> {
        const userTypeRepository = getCustomRepository(UserTypeRepository);

        const userType = await userTypeRepository.findByIdWQB(id);

        if (!userType) throw new Error('Tipo de Usuário não encontrado !');

        return userType;
    }

    public async update(userTypeData: IUserTypeInstance): Promise<UserType | unknown> {
        const userTypeRepository = getCustomRepository(UserTypeRepository);

        const userType = await userTypeRepository.findOne(userTypeData.id);

        if (!userType) throw new Error('Tipo de Usuário não encontrado !');
        
        userType.name = userTypeData.name;

        const userTypeUpdate = await userTypeRepository.saveWT(userType);

        if (!userTypeUpdate) throw new Error('Não foi possível alterar o Tipo de Usuário !');

        return userTypeUpdate;
    }
}

export default new UserTypeService();
