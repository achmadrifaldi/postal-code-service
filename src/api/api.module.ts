import { Module } from '@nestjs/common';
import { ProvincesModule } from './provinces/provinces.module';
import { CitiesModule } from './cities/cities.module';
import { SubDistrictsModule } from './sub-districts/sub-districts.module';
import { VillagesModule } from './villages/villages.module';
import { PostalCodeModule } from './postal-code/postal-code.module';

@Module({
  imports: [ProvincesModule, CitiesModule, SubDistrictsModule, VillagesModule, PostalCodeModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
