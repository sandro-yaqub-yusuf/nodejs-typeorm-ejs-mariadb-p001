import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('parameters')
export default class Parameter {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @Column('varchar', { name: 'attribute', length: 100 })
    attribute: string;

    @Column('varchar', { name: 'value', length: 255 })
    value: string;
}
