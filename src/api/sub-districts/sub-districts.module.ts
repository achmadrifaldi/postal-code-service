import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubDistrict } from './entities/sub-district.entity';
import { SubDistrictsController } from './sub-districts.controller';
import { SubDistrictsService } from './sub-districts.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubDistrict])],
  controllers: [SubDistrictsController],
  providers: [SubDistrictsService],
  exports: [SubDistrictsService],
})
export class SubDistrictsModule {}
