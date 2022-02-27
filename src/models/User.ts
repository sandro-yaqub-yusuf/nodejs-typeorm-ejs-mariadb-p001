import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';
import UserType from './UserType';

@Index('idx1_users_user_type_id_foreign', ['userTypeId'])
@Entity('users')
export default class User {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @Column('int', { name: 'user_type_id', unsigned: true, default: () => "'3'" })
    userTypeId: number;

    @Column('varchar', { name: 'login', length: 30 })
    login: string;

    @Column('varchar', { name: 'password', length: 255 })
    password: string;

    @Column('varchar', { name: 'name', length: 100 })
    name: string;

    @Column('varchar', { name: 'email', length: 100 })
    email: string;

    @Column('tinyint', { name: 'terms', default: () => "'0'" })
    terms: number;

    @Column('varchar', { name: 'image_url', length: 255, nullable: true })
    imageUrl: string | null;

    @CreateDateColumn({ name: 'created_at', default: () => "'current_timestamp(6)'" })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: true, default: () => "'current_timestamp(6)'" })
    updatedAt: Date | null;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    @BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    @ManyToOne(() => UserType, (userType) => userType.users, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
	
    @JoinColumn([{ name: 'user_type_id', referencedColumnName: 'id' }])
    userType: UserType;
}
