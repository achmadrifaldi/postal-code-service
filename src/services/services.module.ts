import { Module } from '@nestjs/common';
import { ProvinceModule } from './province/province.module';
import { DistrictModule } from './district/district.module';
import { SubDistrictModule } from './subdistrict/subdistrict.module';
import { VillageModule } from './village/village.module';
import { PostalCodeModule } from './postal-code/postal-code.module';

@Module({
  imports: [
    ProvinceModule,
    DistrictModule,
    SubDistrictModule,
    VillageModule,
    PostalCodeModule,
  ],
})
export class ServicesModule {}
