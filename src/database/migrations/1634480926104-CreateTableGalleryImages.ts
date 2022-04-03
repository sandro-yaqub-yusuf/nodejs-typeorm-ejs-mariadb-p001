import * as typeorm from 'typeorm';

export class CreateTableGalleryImages1634480926104 implements typeorm.MigrationInterface {
    public async up(queryRunner: typeorm.QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS gallery_images (
                id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
                name varchar(200) NOT NULL COLLATE 'utf8mb4_general_ci',
                image_width smallint(6) NOT NULL DEFAULT 1,
                image_height smallint(6) NOT NULL DEFAULT 1,
                image_url varchar(255) NOT NULL COLLATE 'utf8mb4_general_ci',
                created_at datetime(6) NOT NULL DEFAULT current_timestamp(6),
                updated_at datetime(6) NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
                deleted_at datetime(6) NULL DEFAULT NULL,
                PRIMARY KEY (id) USING BTREE
            ) ENGINE=InnoDB AUTO_INCREMENT=1 COLLATE='utf8mb4_general_ci' DEFAULT CHARSET=utf8mb4;
        `);
    }

    public async down(queryRunner: typeorm.QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS gallery_images;`);
    }
}
