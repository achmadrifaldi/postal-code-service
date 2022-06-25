import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PgProviderSeederConfigService } from 'src/database/seeders/sample-data/config/seeder.service';
import { SampleDataService } from './sample-data.service';
import { ProvincesModule } from 'src/api/provinces/provinces.module';
import { CitiesModule } from 'src/api/cities/cities.module';
import { SubDistrictsModule } from 'src/api/sub-districts/sub-districts.module';
import { VillagesModule } from 'src/api/villages/villages.module';
import { PostalCodeModule } from 'src/api/postal-code/postal-code.module';

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
  providers: [SampleDataService],
})
export class SampleDataModule {}
