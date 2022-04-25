import * as typeorm from 'typeorm';

@typeorm.Entity('pages')
export default class Page {
    @typeorm.PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @typeorm.Column('varchar', { name: 'name', length: 25 })
    name: string;

    @typeorm.Column('text', { name: 'content', nullable: true })
    content: string | null;

    @typeorm.Column('tinyint', { name: 'order_show', default: () => "'1'" })
    orderShow: number;

    @typeorm.Column('tinyint', { name: 'open_another_tab', default: () => "'0'" })
    openAnotherTab: number;

    @typeorm.Column('tinyint', { name: 'site_enable', default: () => "'0'" })
    siteEnable: number;

    @typeorm.CreateDateColumn({ name: 'created_at', default: () => "'current_timestamp(6)'" })
    createdAt: Date;

    @typeorm.UpdateDateColumn({ name: 'updated_at', nullable: true, default: () => "'current_timestamp(6)'" })
    updatedAt: Date | null;

    @typeorm.DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date | null;    
}
