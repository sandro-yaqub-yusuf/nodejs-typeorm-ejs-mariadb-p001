import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateTableUsers1634480926102 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users (
                id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
                user_type_id int(10) UNSIGNED NOT NULL DEFAULT 3,
                login varchar(30) NOT NULL COLLATE 'utf8mb4_general_ci',
                password varchar(255) NOT NULL COLLATE 'utf8mb4_general_ci',
                name varchar(100) NOT NULL COLLATE 'utf8mb4_general_ci',
                email varchar(100) NOT NULL COLLATE 'utf8mb4_general_ci',
                terms tinyint(1) NOT NULL DEFAULT 0,
                image_url varchar(255) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
                created_at datetime(6) NOT NULL DEFAULT current_timestamp(6),
                updated_at datetime(6) NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
                deleted_at datetime(6) NULL DEFAULT NULL,
                PRIMARY KEY (id) USING BTREE,
                KEY idx1_users_user_type_id_foreign (user_type_id) USING BTREE
            ) ENGINE=InnoDB AUTO_INCREMENT=1 COLLATE='utf8mb4_general_ci' DEFAULT CHARSET=utf8mb4;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS users;`);
    }
}
