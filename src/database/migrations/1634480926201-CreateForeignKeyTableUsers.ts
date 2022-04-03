import * as typeorm from 'typeorm';

export class CreateForeignKeyTableUsers1634480926201 implements typeorm.MigrationInterface {
    public async up(queryRunner: typeorm.QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users ADD CONSTRAINT fk1_users_user_type_id_foreign FOREIGN KEY (user_type_id) REFERENCES users_types (id);
        `);
    }

    public async down(queryRunner: typeorm.QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users DROP FOREIGN KEY fk1_users_user_type_id_foreign;`);
    }
}
