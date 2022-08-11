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
import { ListOptionVillageDto } from './dto/param-list-village.dto';
import { Village } from './entities/village.entity';
import { VillageService } from './village.service';

@Controller('village')
@ApiTags('Location')
@UseInterceptors(ClassSerializerInterceptor, CustomBaseResponseInterceptor)
export class VillageController {
  constructor(public service: VillageService) {}

  @Get()
  @ApiPaginatedResponse(Village)
  async getAll(@Query() listOptionDto: ListOptionVillageDto) {
    const result = await this.service.findAll(listOptionDto);
    return { message: 'OK', result };
  }
}
