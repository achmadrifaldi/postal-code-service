import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresService } from './config/database/postgres/postgres.service';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: PostgresService }),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
