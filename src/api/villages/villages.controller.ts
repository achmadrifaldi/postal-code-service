import {
  Body,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BaseResponse } from 'src/common/dto/base-response';
import { Pagination } from 'src/common/dto/pagination';
import { SearchDto } from './dto';
import { VillagesService } from './villages.service';
import { VillageResponseInterface } from './interfaces/village-response.interface';

@Controller('villages')
export class VillagesController {
  @Inject(VillagesService)
  private readonly service: VillagesService;

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async getSubDistricts(@Body() body: SearchDto): Promise<BaseResponse> {
    const result: Pagination<VillageResponseInterface> =
      await this.service.findAll(body);

    return new BaseResponse({
      message: 'Success',
      data: result,
    });
  }
}
