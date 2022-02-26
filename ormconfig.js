module.exports = {
   "type": "mariadb",
   "host": process.env.MYSQL_HOST,
   "port": process.env.MYSQL_PORT,
   "username": process.env.MYSQL_USER,
   "password": process.env.MYSQL_PWD,
   "database": process.env.MYSQL_DB,
   "synchronize": false,
   "entities": (process.env.NODE_DEPLOY == 'DEV' ? ["src/models/**/*.ts"] : ["dist/models/**/*.js"]),
   "migrations": (process.env.NODE_DEPLOY == 'DEV' ? ["src/database/migrations/**/*.ts"] : ["dist/database/migrations/**/*.js"]),
   "cli": {
      "entitiesDir": "src/models",
      "migrationsDir": "src/database/migrations"
   }
}
