import * as typeorm from 'typeorm';

export class SeedTableUsersTypes1634480926301 implements typeorm.MigrationInterface {
    public async up(queryRunner: typeorm.QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO users_types (id, name, created_at, updated_at, deleted_at) VALUES
            (1, 'Administrador', '2022-01-01 09:00:00', '2022-01-01 09:00:00', NULL),
            (2, 'Operador', '2022-01-01 09:00:00', '2022-01-01 09:00:00', NULL),
            (3, 'Somente Consulta', '2022-01-01 09:00:00', '2022-01-01 09:00:00', NULL);
        `);
    }

    public async down(queryRunner: typeorm.QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users_types;`);
    }
}
