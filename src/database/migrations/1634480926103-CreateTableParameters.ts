import * as typeorm from 'typeorm';

export class CreateTableParameters1634480926103 implements typeorm.MigrationInterface {
    public async up(queryRunner: typeorm.QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS parameters (
                id int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
                attribute varchar(100) NOT NULL COLLATE 'utf8mb4_general_ci',
                value varchar(255) NOT NULL COLLATE 'utf8mb4_general_ci',
                PRIMARY KEY (id) USING BTREE
            ) ENGINE=InnoDB AUTO_INCREMENT=1 COLLATE='utf8mb4_general_ci' DEFAULT CHARSET=utf8mb4;
        `);
    }

    public async down(queryRunner: typeorm.QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS parameters;`);
    }
}
