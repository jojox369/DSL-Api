const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist';

module.exports = {
  type: 'sqlite',

  database: rootDir + '/database/database.sqlite',
  synchronize: true,
  entities: [rootDir + '/models/*.{js,ts}'],

  cli: {
    migrationsDir: rootDir + '/database/migrations',
  },
};
