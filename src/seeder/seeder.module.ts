import { PostalCodeModule } from './../api/postal-code/postal-code.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PgProviderSeederConfigService } from 'src/seeder/config/seeder.service';
import { SeederService } from './seeder.service';
import { ProvincesModule } from 'src/api/provinces/provinces.module';
import { CitiesModule } from 'src/api/cities/cities.module';
import { SubDistrictsModule } from 'src/api/sub-districts/sub-districts.module';
import { VillagesModule } from 'src/api/villages/villages.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: PgProviderSeederConfigService }),
    ProvincesModule,
    CitiesModule,
    SubDistrictsModule,
    VillagesModule,
    PostalCodeModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
