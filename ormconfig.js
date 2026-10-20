var dbConfig = {
    synchronize: false,
    migrations: ['migrations/*.js'],
    cli: {
        migrationsDir: 'migrations',
    },
};

switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'better-sqlite3',
            database: 'db.sqlite',
            entities: ['**/*.entity.js'],
        });
        break;
    case 'test':
        Object.assign(dbConfig, {
            type: 'better-sqlite3',
            database: 'test.sqlite',
            entities: ['**/*.entity.ts'],
            migrations: ['migrations/*.ts'],
            migrationsRun: true, 
        });
        break;
    case 'production':
        Object.assign(dbConfig, {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities: ['**/*.entity.js'],
            ssl: {
                rejectUnauthorized: false
            },
        });
        break;
    default:
        throw new Error('unknown environment');
}

module.exports = dbConfig;
