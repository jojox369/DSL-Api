const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'build/src';

module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  entities: [rootDir + '/models/*.{js,ts}'],

  cli: {
    migrationsDir: rootDir + '/database/migrations',
  },
};
