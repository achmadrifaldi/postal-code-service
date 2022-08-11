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
  ListOptionDto,
} from 'src/common';
import { Province } from './entities/province.entity';
import { ProvinceService } from './province.service';

@Controller('province')
@ApiTags('Location')
@UseInterceptors(ClassSerializerInterceptor, CustomBaseResponseInterceptor)
export class ProvinceController {
  constructor(public service: ProvinceService) {}

  @Get()
  @ApiPaginatedResponse(Province)
  async getAll(@Query() listOptionDto: ListOptionDto) {
    const result = await this.service.findAll(listOptionDto);
    return { message: 'OK', result };
  }
}
