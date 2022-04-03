import GalleryImage from '../models/GalleryImage';
import { GalleryImageRepository } from '../repositories/galleryImageRepository';

interface IGalleryImageInstance {
    id?: number;
    name: string;
    imageWidth: number;
    imageHeight: number;
    imageUrl: string;
}

class GalleryImageService {
    public async getAll(wDeleted: number = 0, wOrderColumn: string = 'id', wOrderType: string = 'A', wLimit: number = 0, wRandom: boolean = false): Promise<GalleryImage[]> {
        return await GalleryImageRepository.findAllWQB(wDeleted, wOrderColumn, wOrderType, wLimit, wRandom);
    }

    public async getById(id: number): Promise<GalleryImage | null> {
        return await GalleryImageRepository.findByIdWQB(id);
    }

    public async store(galleryImageData: IGalleryImageInstance): Promise<GalleryImage> {
        const galleryImage = GalleryImageRepository.create(galleryImageData);

        const galleryImageStore = await GalleryImageRepository.saveWT(galleryImage);

        if (!galleryImageStore) throw new Error('Não foi possível cadastrar a Imagem !');

        return galleryImageStore;
    }

    public async update(galleryImageData: IGalleryImageInstance): Promise<GalleryImage> {
        const galleryImage = await GalleryImageRepository.findOneBy({ id: galleryImageData.id });

        if (!galleryImage) throw new Error('Imagem não encontrada !');
        
        galleryImage.name = galleryImageData.name;
        galleryImage.imageWidth = galleryImageData.imageWidth;
        galleryImage.imageHeight = galleryImageData.imageHeight;
        galleryImage.imageUrl = galleryImageData.imageUrl;

        const galleryImageUpdate = await GalleryImageRepository.saveWT(galleryImage);

        if (!galleryImageUpdate) throw new Error('Não foi possível alterar a Imagem !');

        return galleryImageUpdate;
    }

    public async destroy(id: number): Promise<void> {
        const galleryImage = await GalleryImageRepository.findOneBy({ id });

        if (!galleryImage) throw new Error('Imagem não encontrada !');

        const galleryImageDelete = await GalleryImageRepository.softDeleteWT(id);

        if (!galleryImageDelete) throw new Error('Não foi possível excluir a Imagem !');
    }
}

export default new GalleryImageService();
