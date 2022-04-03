import * as typeorm from 'typeorm';

@typeorm.Entity('gallery_images')
export default class Menu {
    @typeorm.PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @typeorm.Column('varchar', { name: 'name', length: 200 })
    name: string;

    @typeorm.Column('tinyint', { name: 'image_width', default: () => "'1'" })
    imageWidth: number;

    @typeorm.Column('tinyint', { name: 'image_height', default: () => "'1'" })
    imageHeight: number;

    @typeorm.Column('varchar', { name: 'image_url', length: 255 })
    imageUrl: string;

    @typeorm.CreateDateColumn({ name: 'created_at', default: () => "'current_timestamp(6)'" })
    createdAt: Date;

    @typeorm.UpdateDateColumn({ name: 'updated_at', nullable: true, default: () => "'current_timestamp(6)'" })
    updatedAt: Date | null;

    @typeorm.DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date | null;    
}
