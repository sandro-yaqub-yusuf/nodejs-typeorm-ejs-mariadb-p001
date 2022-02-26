import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@Entity('users_types')
export default class UserType {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @Column('varchar', { name: 'name', length: 50 })
    name: string;

    @CreateDateColumn({ name: 'created_at', default: () => "'current_timestamp(6)'" })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: true, default: () => "'current_timestamp(6)'" })
    updatedAt: Date | null;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    @OneToMany(() => User, (user) => user.userType)
    users: User[];
}
