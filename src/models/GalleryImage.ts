import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gallery_images')
export default class Menu {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @Column('varchar', { name: 'name', length: 200 })
    name: string;

    @Column('tinyint', { name: 'image_width', default: () => "'1'" })
    imageWidth: number;

    @Column('tinyint', { name: 'image_height', default: () => "'1'" })
    imageHeight: number;

    @Column('varchar', { name: 'image_url', length: 255 })
    imageUrl: string;

    @CreateDateColumn({ name: 'created_at', default: () => "'current_timestamp(6)'" })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: true, default: () => "'current_timestamp(6)'" })
    updatedAt: Date | null;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date | null;    
}
