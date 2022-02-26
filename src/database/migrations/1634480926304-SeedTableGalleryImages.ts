import {MigrationInterface, QueryRunner} from 'typeorm';

export class SeedTableGalleryImages1634480926304 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO gallery_images (id, name, image_width, image_height, image_url, created_at, updated_at, deleted_at) VALUES
            (1, 'Banner exemplo para as páginas', 1200, 350, '/images/admin/banner_page.jpg', '2022-01-01 09:00:00', '2022-01-01 09:00:00', NULL);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM gallery_images;`);
    }
}
