import { SubDistrictResponseInterface } from './interfaces/sub-district-response.interface';
import {
  Controller,
  Inject,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BaseResponse } from 'src/common/dto/base-response';
import { Pagination } from 'src/common/dto/pagination';
import { SubDistrictsService } from './sub-districts.service';
import { SearchDto } from './dto';

@Controller('sub-districts')
export class SubDistrictsController {
  @Inject(SubDistrictsService)
  private readonly service: SubDistrictsService;

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async getSubDistricts(@Body() body: SearchDto): Promise<BaseResponse> {
    const result: Pagination<SubDistrictResponseInterface> =
      await this.service.findAll(body);

    return new BaseResponse({
      message: 'Success',
      data: result,
    });
  }
}
