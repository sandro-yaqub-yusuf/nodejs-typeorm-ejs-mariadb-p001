import { EntityRepository, getConnection, Repository } from 'typeorm';
import User from '../models/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    public async findAllWQB(wrUserType: boolean, wDeleted: boolean, wOrderColumn: string, wOrderType: string, wLimit: number, wRandom: boolean): Promise<User[]> {
        const query = this.createQueryBuilder('users');

        query.select(['users.id', 'users.login', 'users.name', 'users.email', 'users.createdAt', 'users.updatedAt', 'users.deletedAt']);

        if (wrUserType) query.innerJoin('users.userType', 'userType').withDeleted().addSelect('userType.name');
        if (wDeleted) query.withDeleted();

        if (wRandom) query.orderBy('RAND()');
        else query.orderBy(('users.' + wOrderColumn), (wOrderType == 'A' ? 'ASC' : 'DESC'));

        if (wLimit > 0) query.take(wLimit);

        const users = await query.getMany();

        return users;
    }

    public async findByIdWQB(id: number, wrUserType: boolean = false): Promise<User | undefined> {
        const query = this.createQueryBuilder('users');

        query.select().withDeleted();

        if (wrUserType) query.innerJoin('users.userType', 'userType').withDeleted().addSelect('userType.name');

        query.where('users.id = :id', { id })

        const user = await query.getOne();

        return user;
    }

    public async saveWT(user: User): Promise<User | unknown> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        
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
    }

    public async softDeleteWT(id: number): Promise<boolean | unknown> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        
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
}
