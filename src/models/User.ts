import * as typeorm from 'typeorm';
import bcrypt from 'bcryptjs';
import UserType from './UserType';

@typeorm.Index('idx1_users_user_type_id_foreign', ['userTypeId'])
@typeorm.Entity('users')
export default class User {
    @typeorm.PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
    id: number;

    @typeorm.Column('int', { name: 'user_type_id', unsigned: true, default: () => "'3'" })
    userTypeId: number;

    @typeorm.Column('varchar', { name: 'login', length: 30 })
    login: string;

    @typeorm.Column('varchar', { name: 'password', length: 255 })
    password: string;

    @typeorm.Column('varchar', { name: 'name', length: 100 })
    name: string;

    @typeorm.Column('varchar', { name: 'email', length: 100 })
    email: string;

    @typeorm.Column('tinyint', { name: 'terms', default: () => "'0'" })
    terms: number;

    @typeorm.Column('varchar', { name: 'image_url', length: 255, nullable: true })
    imageUrl: string | null;

    @typeorm.CreateDateColumn({ name: 'created_at', default: () => "'current_timestamp(6)'" })
    createdAt: Date;

    @typeorm.UpdateDateColumn({ name: 'updated_at', nullable: true, default: () => "'current_timestamp(6)'" })
    updatedAt: Date | null;

    @typeorm.DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    @typeorm.BeforeInsert()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    @typeorm.ManyToOne(() => UserType, (userType) => userType.users, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
    })
	
    @typeorm.JoinColumn([{ name: 'user_type_id', referencedColumnName: 'id' }])
    userType: UserType;
}
