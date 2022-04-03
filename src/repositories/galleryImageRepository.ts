import * as database from '../database';
import GalleryImage from '../models/GalleryImage';

export const GalleryImageRepository = database.dataSource.getRepository(GalleryImage).extend({
    async findAllWQB(wDeleted: number, wOrderColumn: string, wOrderType: string, wLimit: number, wRandom: boolean): Promise<GalleryImage[]> {
        const query = this.createQueryBuilder('galleryImages');

        query.select();

        if (wDeleted > 0) query.withDeleted();

        if (wRandom) query.orderBy('RAND()');
        else query.orderBy(('galleryImages.' + wOrderColumn), (wOrderType == 'A' ? 'ASC' : 'DESC'));

        if (wLimit > 0) query.take(wLimit);

        return await query.getMany();
    },
    async findByIdWQB(id: number): Promise<GalleryImage | null> {
        const query = this.createQueryBuilder('galleryImages');

        query.select().withDeleted().where('galleryImages.id = :id', { id });

        return await query.getOne();
    },
    async saveWT(galleryImage: GalleryImage): Promise<GalleryImage | null> {
        const queryRunner = database.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        let ok = false;

        try {
            galleryImage = await queryRunner.manager.save(galleryImage);

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

        return (ok ? galleryImage : null);
    },
    async softDeleteWT(id: number): Promise<boolean | null> {
        const queryRunner = database.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        let ok = false;

        try {
            await queryRunner.manager.softDelete(GalleryImage, { id });

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
