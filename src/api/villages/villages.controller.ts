import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/dto/base-response';
import { Pagination } from 'src/common/dto/pagination';
import { SearchVillageDto } from './dto';
import { VillagesService } from './villages.service';
import { VillageResponseInterface } from './interfaces/village-response.interface';

@Controller('villages')
export class VillagesController {
  @Inject(VillagesService)
  private readonly service: VillagesService;

  @Post()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'Get list village of Indonesia.',
  })
  public async getSubDistricts(
    @Body() body: SearchVillageDto,
  ): Promise<BaseResponse> {
    const result: Pagination<VillageResponseInterface> =
      await this.service.findAll(body);

    return new BaseResponse({
      message: 'Success',
      data: result,
    });
  }
}
