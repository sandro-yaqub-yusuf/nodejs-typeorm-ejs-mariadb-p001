import * as typeorm from 'typeorm';
import User from './User';

@typeorm.Entity('users_types')
export default class UserType {
    @typeorm.PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @typeorm.Column('varchar', { name: 'name', length: 50 })
    name: string;

    @typeorm.CreateDateColumn({ name: 'created_at', default: () => "'current_timestamp(6)'" })
    createdAt: Date;

    @typeorm.UpdateDateColumn({ name: 'updated_at', nullable: true, default: () => "'current_timestamp(6)'" })
    updatedAt: Date | null;

    @typeorm.DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    @typeorm.OneToMany(() => User, (user) => user.userType)
    users: User[];
}
