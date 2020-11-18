const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist';

module.exports = {
  type: 'mysql',
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  port: 3306,
  database: process.env.MYSQL_DATABASE,

  //database: rootDir + '/database/database.sqlite',
  synchronize: true,

  entities: [rootDir + '/models/*.{js,ts}'],
  cli: {
    migrationsDir: rootDir + '/database/migrations',
  },
};
