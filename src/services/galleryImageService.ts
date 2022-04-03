import * as database from '../database';
import GalleryImage from '../models/GalleryImage';

interface IGalleryImageInstance {
    id?: number;
    name: string;
    imageWidth: number;
    imageHeight: number;
    imageUrl: string;
}

const galleryImageRepository = database.dataSource.getRepository(GalleryImage).extend({
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

class GalleryImageService {
    public async getAll(wDeleted: number = 0, wOrderColumn: string = 'id', wOrderType: string = 'A', wLimit: number = 0, wRandom: boolean = false): Promise<GalleryImage[]> {
        return await galleryImageRepository.findAllWQB(wDeleted, wOrderColumn, wOrderType, wLimit, wRandom);
    }

    public async getById(id: number): Promise<GalleryImage | null> {
        return await galleryImageRepository.findByIdWQB(id);
    }

    public async store(galleryImageData: IGalleryImageInstance): Promise<GalleryImage> {
        const galleryImage = galleryImageRepository.create(galleryImageData);

        const galleryImageStore = await galleryImageRepository.saveWT(galleryImage);

        if (!galleryImageStore) throw new Error('Não foi possível cadastrar a Imagem !');

        return galleryImageStore;
    }

    public async update(galleryImageData: IGalleryImageInstance): Promise<GalleryImage> {
        const galleryImage = await galleryImageRepository.findOneBy({ id: galleryImageData.id });

        if (!galleryImage) throw new Error('Imagem não encontrada !');
        
        galleryImage.name = galleryImageData.name;
        galleryImage.imageWidth = galleryImageData.imageWidth;
        galleryImage.imageHeight = galleryImageData.imageHeight;
        galleryImage.imageUrl = galleryImageData.imageUrl;

        const galleryImageUpdate = await galleryImageRepository.saveWT(galleryImage);

        if (!galleryImageUpdate) throw new Error('Não foi possível alterar a Imagem !');

        return galleryImageUpdate;
    }

    public async destroy(id: number): Promise<void> {
        const galleryImage = await galleryImageRepository.findOneBy({ id });

        if (!galleryImage) throw new Error('Imagem não encontrada !');

        const galleryImageDelete = await galleryImageRepository.softDeleteWT(id);

        if (!galleryImageDelete) throw new Error('Não foi possível excluir a Imagem !');
    }
}

export default new GalleryImageService();
