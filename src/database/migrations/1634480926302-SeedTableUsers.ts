import * as typeorm from 'typeorm';

export class SeedTableUsers1634480926302 implements typeorm.MigrationInterface {
    public async up(queryRunner: typeorm.QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO users (id, user_type_id, login, password, name, email, terms, image_url, created_at, updated_at, deleted_at) VALUES
            (1, 1, 'admin', '$2a$08$dRy2ylTiWt/Tzk1v6PECEevrOVCiJGtVS7qYJWxBtozsdgdz0BJYu', 'Administrador', 'admin@teste.com', 1, '/images/admin/user.jpg', '2022-01-01 09:00:00', '2022-01-01 09:00:00', NULL);
        `);
    }

    public async down(queryRunner: typeorm.QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users;`);
    }
}
