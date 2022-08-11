import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiPaginatedResponse,
  CustomBaseResponseInterceptor,
} from 'src/common';
import { ListOptionSubDistrictDto } from './dto/param-list-subdistrict.dto';
import { SubDistrict } from './entities/subdistrict.entity';
import { SubDistrictService } from './subdistrict.service';

@Controller('subdistrict')
@ApiTags('Location')
@UseInterceptors(ClassSerializerInterceptor, CustomBaseResponseInterceptor)
export class SubDistrictController {
  constructor(public service: SubDistrictService) {}

  @Get()
  @ApiPaginatedResponse(SubDistrict)
  async getAll(@Query() listOptionDto: ListOptionSubDistrictDto) {
    const result = await this.service.findAll(listOptionDto);
    return { message: 'OK', result };
  }
}
