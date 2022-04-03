import * as typeorm from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const dataSource = new typeorm.DataSource({
    type: 'mariadb',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT as unknown as number,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: process.env.MYSQL_DB,
    synchronize: false,
    entities: (process.env.NODE_DEPLOY == 'DEV' ? ["src/models/**/*.ts"] : ["dist/models/**/*.js"]),
    migrations: (process.env.NODE_DEPLOY == 'DEV' ? ["src/database/migrations/**/*.ts"] : ["dist/database/migrations/**/*.js"])
});

async function connectDB(): Promise<void> {
    const ds = await dataSource.initialize();
}

connectDB();
