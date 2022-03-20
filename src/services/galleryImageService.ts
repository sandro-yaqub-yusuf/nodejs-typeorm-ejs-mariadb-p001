import { dataSource } from '../database';
import GalleryImage from '../models/GalleryImage';

interface IGalleryImageInstance {
    id?: number;
    name: string;
    imageWidth: number;
    imageHeight: number;
    imageUrl: string;
}

const galleryImageRepository = dataSource.getRepository(GalleryImage).extend({
    async findAllWQB(wDeleted: number, wOrderColumn: string, wOrderType: string, wLimit: number, wRandom: boolean): Promise<GalleryImage[]> {
        const query = this.createQueryBuilder('galleryImages');

        query.select();

        if (wDeleted > 0) query.withDeleted();

        if (wRandom) query.orderBy('RAND()');
        else query.orderBy(('galleryImages.' + wOrderColumn), (wOrderType == 'A' ? 'ASC' : 'DESC'));

        if (wLimit > 0) query.take(wLimit);

        const galleryImages = await query.getMany();

        return galleryImages;
    },
    async findByIdWQB(id: number): Promise<GalleryImage | null> {
        const query = this.createQueryBuilder('galleryImages');

        query.select().withDeleted().where('galleryImages.id = :id', { id });

        const galleryImage = await query.getOne();

        return galleryImage;
    },
    async saveWT(galleryImage: GalleryImage): Promise<GalleryImage | null> {
        const queryRunner = dataSource.createQueryRunner();
        
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
        const queryRunner = dataSource.createQueryRunner();
        
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
        const galleryImages = await galleryImageRepository.findAllWQB(wDeleted, wOrderColumn, wOrderType, wLimit, wRandom);

        return galleryImages;
    }

    public async getById(id: number): Promise<GalleryImage> {
        const galleryImage = await galleryImageRepository.findByIdWQB(id);

        if (!galleryImage) throw new Error('Imagem não encontrada !');

        return galleryImage;
    }

    public async store(galleryImageData: IGalleryImageInstance): Promise<GalleryImage | null> {
        const galleryImage = galleryImageRepository.create(galleryImageData);

        const galleryImageStore = await galleryImageRepository.save(galleryImage);

        if (!galleryImageStore) throw new Error('Não foi possível cadastrar a Imagem !');

        return galleryImageStore;
    }

    public async update(galleryImageData: IGalleryImageInstance): Promise<GalleryImage | null> {
        const galleryImage = await galleryImageRepository.findOneBy({ id: galleryImageData.id });

        if (!galleryImage) throw new Error('Imagem não encontrada !');
        
        galleryImage.name = galleryImageData.name;
        galleryImage.imageWidth = galleryImageData.imageWidth;
        galleryImage.imageHeight = galleryImageData.imageHeight;
        galleryImage.imageUrl = galleryImageData.imageUrl;

        const galleryImageUpdate = await galleryImageRepository.save(galleryImage);

        if (!galleryImageUpdate) throw new Error('Não foi possível alterar a Imagem !');

        return galleryImageUpdate;
    }

    public async destroy(id: number): Promise<void> {
        const galleryImage = await galleryImageRepository.findOneBy({ id });

        if (!galleryImage) throw new Error('Imagem não encontrada !');

        const galleryImageDelete = await galleryImageRepository.softDelete(id);

        if (!galleryImageDelete) throw new Error('Não foi possível excluir a Imagem !');
    }
}

export default new GalleryImageService();
