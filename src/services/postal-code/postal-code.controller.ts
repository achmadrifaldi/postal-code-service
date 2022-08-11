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

import { ListOptionPostalCodeDto } from './dto/param-list-postal-code.dto';
import { PostalCode } from './entities/postal-code.entity';
import { PostalCodeService } from './postal-code.service';

@Controller('postal-code')
@ApiTags('Location')
@UseInterceptors(ClassSerializerInterceptor, CustomBaseResponseInterceptor)
export class PostalCodeController {
  constructor(public service: PostalCodeService) {}

  @Get()
  @ApiPaginatedResponse(PostalCode)
  async getAll(@Query() listOptionDto: ListOptionPostalCodeDto) {
    const result = await this.service.findAll(listOptionDto);
    return { message: 'OK', result };
  }
}
