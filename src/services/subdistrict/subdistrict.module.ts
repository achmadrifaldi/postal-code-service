import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubDistrict } from './entities/subdistrict.entity';
import { SubDistrictService } from './subdistrict.service';
import { SubDistrictController } from './subdistrict.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubDistrict])],
  controllers: [SubDistrictController],
  providers: [SubDistrictService],
  exports: [SubDistrictService],
})
export class SubDistrictModule {}
