import { getCustomRepository } from 'typeorm';
import GalleryImage from '../models/GalleryImage';
import GalleryImageRepository from '../repositories/galleryImageRepository';

interface IGalleryImageInstance {
    id?: number;
    name: string;
    imageWidth: number;
    imageHeight: number;
    imageUrl: string;
}

class GalleryImageService {
    public async getAll(wDeleted: number = 0, wOrderColumn: string = 'id', wOrderType: string = 'A', wLimit: number = 0, wRandom: boolean = false): Promise<GalleryImage[]> {
        const galleryImageRepository = getCustomRepository(GalleryImageRepository);

        const galleryImages = await galleryImageRepository.findAllWQB(wDeleted, wOrderColumn, wOrderType, wLimit, wRandom);

        return galleryImages;
    }

    public async getById(id: number): Promise<GalleryImage | undefined> {
        const galleryImageRepository = getCustomRepository(GalleryImageRepository);

        const galleryImage = await galleryImageRepository.findByIdWQB(id);

        if (!galleryImage) throw new Error('Imagem não encontrada !');

        return galleryImage;
    }

    public async store(galleryImageData: IGalleryImageInstance): Promise<GalleryImage | unknown> {
        const galleryImageRepository = getCustomRepository(GalleryImageRepository);

        const galleryImage = galleryImageRepository.create(galleryImageData);

        const galleryImageStore = await galleryImageRepository.saveWT(galleryImage);

        if (!galleryImageStore) throw new Error('Não foi possível cadastrar a Imagem !');

        return galleryImageStore;
    }

    public async update(galleryImageData: IGalleryImageInstance): Promise<GalleryImage | unknown> {
        const galleryImageRepository = getCustomRepository(GalleryImageRepository);

        const galleryImage = await galleryImageRepository.findOne(galleryImageData.id);

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
        const galleryImageRepository = getCustomRepository(GalleryImageRepository);

        const galleryImage = await galleryImageRepository.findOne(id);

        if (!galleryImage) throw new Error('Imagem não encontrada !');

        const galleryImageDelete = await galleryImageRepository.softDeleteWT(id);

        if (!galleryImageDelete) throw new Error('Não foi possível excluir a Imagem !');
    }
}

export default new GalleryImageService();
