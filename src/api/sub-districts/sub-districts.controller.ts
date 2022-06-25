import { SubDistrictResponseInterface } from './interfaces/sub-district-response.interface';
import {
  Controller,
  Inject,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BaseResponse } from 'src/helpers/response/base-response';
import { Pagination } from 'src/helpers/pagination';
import { SubDistrictsService } from './sub-districts.service';
import { SearchSubDistrictDto } from './dto';

@Controller('sub-districts')
export class SubDistrictsController {
  @Inject(SubDistrictsService)
  private readonly service: SubDistrictsService;

  @Post()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 201,
    type: BaseResponse,
    description: 'Get list district of Indonesia.',
  })
  public async getSubDistricts(
    @Body() body: SearchSubDistrictDto,
  ): Promise<BaseResponse> {
    const result: Pagination<SubDistrictResponseInterface> =
      await this.service.findAll(body);

    return new BaseResponse({
      message: 'Success',
      data: result,
    });
  }
}
