import * as typeorm from 'typeorm';

export class CreateTablePages1634480926106 implements typeorm.MigrationInterface {
    public async up(queryRunner: typeorm.QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS pages (
                id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
                name varchar(30) NOT NULL COLLATE 'utf8mb4_general_ci',
                content text NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
                order_show tinyint(2) NOT NULL DEFAULT 1,
                open_another_tab tinyint(1) NOT NULL DEFAULT 0,
                site_enable tinyint(1) NOT NULL DEFAULT 0,
                created_at datetime(6) NOT NULL DEFAULT current_timestamp(6),
                updated_at datetime(6) NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
                deleted_at datetime(6) NULL DEFAULT NULL,
                PRIMARY KEY (id) USING BTREE
            ) ENGINE=InnoDB AUTO_INCREMENT=1 COLLATE='utf8mb4_general_ci' DEFAULT CHARSET=utf8mb4;
        `);
    }

    public async down(queryRunner: typeorm.QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS pages;`);
    }
}
