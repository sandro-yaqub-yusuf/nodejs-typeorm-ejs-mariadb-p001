import { getCustomRepository } from 'typeorm';
import User from '../models/User';
import UserRepository from '../repositories/userRepository';

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
        const userRepository = getCustomRepository(UserRepository);

        const users = await userRepository.findAllWQB(wrUserType, wDeleted, wOrderColumn, wOrderType, wLimit, wRandom);

        return users;
    }

    public async getById(id: number, wrUserType: boolean = false): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findByIdWQB(id, wrUserType);

        if (!user) throw new Error('Usuário não encontrado !');

        return user;
    }

    public async store(userData: IUserInstance): Promise<User | unknown> {
        const userRepository = getCustomRepository(UserRepository);

        if (userData.terms <= 0) throw new Error('O Cadastro não foi efetuado por não concordar com os termos de segurança !');

        const userLoginExists = await userRepository.findOne({ where: { login: userData.login } });

        if (userLoginExists) throw new Error('Login já cadastrado !');

        const userEmailExists = await userRepository.findOne({ where: { email: userData.email } });

        if (userEmailExists) throw new Error('E-mail já cadastrado !');

        const user = userRepository.create(userData);

        const userStore = await userRepository.saveWT(user);

        if (!userStore) throw new Error('Não foi possível cadastrar o Usuário !');

        return userStore;
    }

    public async update(userData: IUserInstance): Promise<User | unknown> {
        const userRepository = getCustomRepository(UserRepository);

        if (userData.terms <= 0) throw new Error('O Cadastro não foi efetuado por não concordar com os termos de segurança !');

        const user = await userRepository.findOne(userData.id);

        if (!user) throw new Error('Usuário não encontrado !');
        
        if (user.login !== userData.login) {
            const userLoginExists = await userRepository.findOne({ where: { login: userData.login } });

            if (userLoginExists) throw new Error('Login já cadastrado !');
        }

        if (user.email !== userData.email) {
            const userEmailExists = await userRepository.findOne({ where: { email: userData.email } });

            if (userEmailExists) throw new Error('E-mail já cadastrado !');
        }

        user.userTypeId = userData.userTypeId;
        user.login = userData.login;
        user.name = userData.name;
        user.email = userData.email;
        user.terms = userData.terms;
        user.imageUrl = (userData.imageUrl ? userData.imageUrl : user.imageUrl);
        
        const userUpdate = await userRepository.saveWT(user);

        if (!userUpdate) throw new Error('Não foi possível alterar o Usuário !');

        return userUpdate;
    }

    public async destroy(id: number): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne(id);

        if (!user) throw new Error('Usuário não encontrado !');

        const userDelete = await userRepository.softDeleteWT(id);

        if (!userDelete) throw new Error('Não foi possível excluir o Usuário !');
    }
}

export default new UserService();
