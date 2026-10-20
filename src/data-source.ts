import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'better-sqlite3',
  database: 'db.sqlite',
  synchronize: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['migrations/*.ts'],
});