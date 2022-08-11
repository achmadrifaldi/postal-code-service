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
import { DistrictService } from './district.service';
import { ListOptionDistrictDto } from './dto/param-list-district.dto';
import { District } from './entities/district.entity';

@Controller('district')
@ApiTags('Location')
@UseInterceptors(ClassSerializerInterceptor, CustomBaseResponseInterceptor)
export class DistrictController {
  constructor(public service: DistrictService) {}

  @Get()
  @ApiPaginatedResponse(District)
  async getAll(@Query() listOptionDto: ListOptionDistrictDto) {
    const result = await this.service.findAll(listOptionDto);
    return { message: 'OK', result };
  }
}
