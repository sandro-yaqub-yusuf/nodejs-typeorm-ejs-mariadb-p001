import * as typeorm from 'typeorm';

@typeorm.Entity('parameters')
export default class Parameter {
    @typeorm.PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @typeorm.Column('varchar', { name: 'attribute', length: 100 })
    attribute: string;

    @typeorm.Column('varchar', { name: 'value', length: 255 })
    value: string;
}
