import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pages')
export default class Page {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @Column('varchar', { name: 'name', length: 50 })
    name: string;

    @Column('text', { name: 'content', nullable: true })
    content: string | null;

    @Column('tinyint', { name: 'order_show', default: () => "'1'" })
    orderShow: number;

    @Column('tinyint', { name: 'open_another_tab', default: () => "'0'" })
    openAnotherTab: number;

    @Column('tinyint', { name: 'site_enable', default: () => "'0'" })
    siteEnable: number;

    @CreateDateColumn({ name: 'created_at', default: () => "'current_timestamp(6)'" })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: true, default: () => "'current_timestamp(6)'" })
    updatedAt: Date | null;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date | null;    
}