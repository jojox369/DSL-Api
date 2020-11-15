const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist';

module.exports = {
  type: 'sqlite',
  /* host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD, */
  database: rootDir + '/database/database.sqlite',
  synchronize: true,
  entities: [rootDir + '/models/*.{js,ts}'],

  cli: {
    migrationsDir: rootDir + '/database/migrations',
  },
};
