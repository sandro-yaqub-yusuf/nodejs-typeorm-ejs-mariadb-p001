import { EntityRepository, getConnection, Repository } from 'typeorm';
import GalleryImage from '../models/GalleryImage';

@EntityRepository(GalleryImage)
export default class GalleryImageRepository extends Repository<GalleryImage> {
    public async findAllWQB(wDeleted: number, wOrderColumn: string, wOrderType: string, wLimit: number, wRandom: boolean): Promise<GalleryImage[]> {
        const query = this.createQueryBuilder('galleryImages');

        query.select();

        if (wDeleted > 0) query.withDeleted();

        if (wRandom) query.orderBy('RAND()');
        else query.orderBy(('galleryImages.' + wOrderColumn), (wOrderType == 'A' ? 'ASC' : 'DESC'));

        if (wLimit > 0) query.take(wLimit);

        const galleryImages = await query.getMany();

        return galleryImages;
    }

    public async findByIdWQB(id: number): Promise<GalleryImage | undefined> {
        const query = this.createQueryBuilder('galleryImages');

        query.select().withDeleted().where('galleryImages.id = :id', { id });

        const galleryImage = await query.getOne();

        return galleryImage;
    }

    public async saveWT(galleryImage: GalleryImage): Promise<GalleryImage | unknown> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        
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
    }

    public async softDeleteWT(id: number): Promise<boolean | unknown> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        
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
}
