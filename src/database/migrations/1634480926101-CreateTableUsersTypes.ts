import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateTableUsersTypes1634480926101 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users_types (
                id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
                name varchar(50) NOT NULL COLLATE 'utf8mb4_general_ci',
                created_at datetime(6) NOT NULL DEFAULT current_timestamp(6),
                updated_at datetime(6) NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
                deleted_at datetime(6) NULL DEFAULT NULL,
                PRIMARY KEY (id) USING BTREE
            ) ENGINE=InnoDB AUTO_INCREMENT=1 COLLATE='utf8mb4_general_ci' DEFAULT CHARSET=utf8mb4;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS users_types;`);
    }
}
