import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PgProviderConfigService } from './common/database/postgres/provider.service';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: PgProviderConfigService }),
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
