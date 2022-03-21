import { dataSource } from '../database';
import User from '../models/User';

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

const userRepository = dataSource.getRepository(User).extend({
    async findAllWQB(wrUserType: boolean, wDeleted: boolean, wOrderColumn: string, wOrderType: string, wLimit: number, wRandom: boolean): Promise<User[]> {
        const query = this.createQueryBuilder('users');

        query.select(['users.id', 'users.login', 'users.name', 'users.email', 'users.createdAt', 'users.updatedAt', 'users.deletedAt']);

        if (wrUserType) query.innerJoin('users.userType', 'userType').withDeleted().addSelect('userType.name');

        if (wDeleted) query.withDeleted();

        if (wRandom) query.orderBy('RAND()');
        else query.orderBy(('users.' + wOrderColumn), (wOrderType == 'A' ? 'ASC' : 'DESC'));

        if (wLimit > 0) query.take(wLimit);

        return await query.getMany();
    },
    async findByIdWQB(id: number, wrUserType: boolean = false): Promise<User | null> {
        const query = this.createQueryBuilder('users');

        query.select().withDeleted();

        if (wrUserType) query.innerJoin('users.userType', 'userType').withDeleted().addSelect('userType.name');

        query.where('users.id = :id', { id });

        return await query.getOne();
    },
    async saveWT(user: User): Promise<User | null> {
        const queryRunner = dataSource.createQueryRunner();
        
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        let ok = false;

        try {
            user = await queryRunner.manager.save(user);

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
        
        return (ok ? user : null);
    },
    async softDeleteWT(id: number): Promise<boolean | null> {
        const queryRunner = dataSource.createQueryRunner();
        
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        let ok = false;

        try {
            await queryRunner.manager.softDelete(User, { id });

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

class UserService {
    public async getAll(wrUserType: boolean = false, wDeleted: boolean = true, wOrderColumn: string = 'id', wOrderType: string = 'A', wLimit: number = 0, wRandom: boolean = false): Promise<User[]> {
        return await userRepository.findAllWQB(wrUserType, wDeleted, wOrderColumn, wOrderType, wLimit, wRandom);
    }

    public async getById(id: number, wrUserType: boolean = false): Promise<User | null> {
        return await userRepository.findByIdWQB(id, wrUserType);
    }

    public async store(userData: IUserInstance): Promise<User> {
        if (userData.terms <= 0) throw new Error('O Cadastro não foi efetuado por não concordar com os termos de segurança !');

        const userLoginExists = await userRepository.findOneBy({ login: userData.login });

        if (userLoginExists) throw new Error('Login já cadastrado !');

        const userEmailExists = await userRepository.findOneBy({ email: userData.email });

        if (userEmailExists) throw new Error('E-mail já cadastrado !');

        const user = userRepository.create(userData);

        const userStore = await userRepository.saveWT(user);

        if (!userStore) throw new Error('Não foi possível cadastrar o Usuário !');

        return userStore;
    }

    public async update(userData: IUserInstance): Promise<User> {
        if (userData.terms <= 0) throw new Error('O Cadastro não foi efetuado por não concordar com os termos de segurança !');

        const user = await userRepository.findOneBy({ id: userData.id });

        if (!user) throw new Error('Usuário não encontrado !');
        
        if (user.login !== userData.login) {
            const userLoginExists = await userRepository.findOneBy({ login: userData.login });

            if (userLoginExists) throw new Error('Login já cadastrado !');
        }

        if (user.email !== userData.email) {
            const userEmailExists = await userRepository.findOneBy({ email: userData.email });

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
        const user = await userRepository.findOneBy({ id });

        if (!user) throw new Error('Usuário não encontrado !');

        const userDelete = await userRepository.softDeleteWT(id);

        if (!userDelete) throw new Error('Não foi possível excluir o Usuário !');
    }
}

export default new UserService();
