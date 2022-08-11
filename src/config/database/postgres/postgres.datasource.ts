import { DataSource } from 'typeorm';
import { PgConfig } from './postgres.config';

const entityPath = 'dist/**/*.entity.{ts,js}';
const migrationPath = 'dist/database/migrations/*.{ts,js}';

export const AppDataSource = new DataSource({
  ...PgConfig,
  type: 'postgres',
  entities: [entityPath],
  migrations: [migrationPath],
});
