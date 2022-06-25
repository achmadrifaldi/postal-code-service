import { DataSource } from 'typeorm';
import { PgConfig } from './postgres.config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...PgConfig,
});
