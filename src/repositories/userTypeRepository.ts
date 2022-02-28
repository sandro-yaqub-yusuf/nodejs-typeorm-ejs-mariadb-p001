import { EntityRepository, getConnection, Repository } from 'typeorm';
import UserType from '../models/UserType';

@EntityRepository(UserType)
export default class userTypeRepository extends Repository<UserType> {
    public async findAllWQB(wDeleted: boolean, wOrderColumn: string, wOrderType: string, wLimit: number, wRandom: boolean): Promise<UserType[]> {
        const query = this.createQueryBuilder('usersTypes');

        query.select();

        if (wDeleted) query.withDeleted();

        if (wRandom) query.orderBy('RAND()');
        else query.orderBy(('usersTypes.' + wOrderColumn), (wOrderType == 'A' ? 'ASC' : 'DESC'));

        if (wLimit > 0) query.take(wLimit);

        const usersTypes = await query.getMany();

        return usersTypes;
    }

    public async findByIdWQB(id: number): Promise<UserType | undefined> {
        const query = this.createQueryBuilder('usersTypes');

        query.select().withDeleted().where('usersTypes.id = :id', { id });

        const userType = await query.getOne();

        return userType;
    }

    public async saveWT(userType: UserType): Promise<UserType | unknown> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        
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
}
