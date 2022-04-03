import User from '../models/User';
import { UserRepository } from '../repositories/userRepository';

interface IUserInstance {
    id?: number;
    userTypeId: number;
    login: string;
    password?: string;
    passwordConfirm?: string;
    name: string;
    email: string;
    terms: number;
    imageUrl?: string;
}

class UserService {
    public async getAll(wrUserType: boolean = false, wDeleted: boolean = true, wOrderColumn: string = 'id', wOrderType: string = 'A', wLimit: number = 0, wRandom: boolean = false): Promise<User[]> {
        return await UserRepository.findAllWQB(wrUserType, wDeleted, wOrderColumn, wOrderType, wLimit, wRandom);
    }

    public async getById(id: number, wrUserType: boolean = false): Promise<User | null> {
        return await UserRepository.findByIdWQB(id, wrUserType);
    }

    public async store(userData: IUserInstance): Promise<User> {
        if (userData.terms <= 0) throw new Error('O Cadastro não foi efetuado por não concordar com os termos de segurança !');

        const userLoginExists = await UserRepository.findOneBy({ login: userData.login });

        if (userLoginExists) throw new Error('Login já cadastrado !');

        const userEmailExists = await UserRepository.findOneBy({ email: userData.email });

        if (userEmailExists) throw new Error('E-mail já cadastrado !');

        const user = UserRepository.create(userData);

        const userStore = await UserRepository.saveWT(user);

        if (!userStore) throw new Error('Não foi possível cadastrar o Usuário !');

        return userStore;
    }

    public async update(userData: IUserInstance): Promise<User> {
        if (userData.terms <= 0) throw new Error('O Cadastro não foi efetuado por não concordar com os termos de segurança !');

        const user = await UserRepository.findOneBy({ id: userData.id });

        if (!user) throw new Error('Usuário não encontrado !');
        
        if (user.login !== userData.login) {
            const userLoginExists = await UserRepository.findOneBy({ login: userData.login });

            if (userLoginExists) throw new Error('Login já cadastrado !');
        }

        if (user.email !== userData.email) {
            const userEmailExists = await UserRepository.findOneBy({ email: userData.email });

            if (userEmailExists) throw new Error('E-mail já cadastrado !');
        }

        user.userTypeId = userData.userTypeId;
        user.login = userData.login;
        user.name = userData.name;
        user.email = userData.email;
        user.terms = userData.terms;
        user.imageUrl = (userData.imageUrl ? userData.imageUrl : user.imageUrl);
        
        const userUpdate = await UserRepository.saveWT(user);

        if (!userUpdate) throw new Error('Não foi possível alterar o Usuário !');

        return userUpdate;
    }

    public async destroy(id: number): Promise<void> {
        const user = await UserRepository.findOneBy({ id });

        if (!user) throw new Error('Usuário não encontrado !');

        const userDelete = await UserRepository.softDeleteWT(id);

        if (!userDelete) throw new Error('Não foi possível excluir o Usuário !');
    }
}

export default new UserService();
