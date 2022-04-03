import * as typeorm from 'typeorm';

export class SeedTableMenus1634480926305 implements typeorm.MigrationInterface {
    public async up(queryRunner: typeorm.QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO menus (id, name, url, order_show, open_another_tab, site_enable, created_at, updated_at, deleted_at) VALUES
            (1, 'Quem Somos', '/pagina/1', 2, 0, 1, '2022-01-01 09:00:00', '2022-01-01 09:00:00', NULL),
            (2, 'Parceiros', '/pagina/2', 1, 1, 1, '2022-01-01 09:00:00', '2022-01-01 09:00:00', NULL);
        `);
    }

    public async down(queryRunner: typeorm.QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM menus;`);
    }
}
