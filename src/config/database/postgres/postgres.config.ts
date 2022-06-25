import * as dotenv from 'dotenv';

dotenv.config();

export const PgConfig = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: `${process.env.DATABASE_PASSWORD}`,
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/database/migrations/*.{ts,js}'],
  subscribers: [],
  migrationsTableName: 'typeorm_migrations',
};
