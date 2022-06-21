import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'kode_pos_service',
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/db/migrations/*.{ts,js}'],
  subscribers: [],
  migrationsTableName: 'typeorm_migrations',
});
