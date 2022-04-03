import * as database from '../database';
import UserType from '../models/UserType';

export const UserTypeRepository = database.dataSource.getRepository(UserType).extend({
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
        const queryRunner = database.dataSource.createQueryRunner();

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
