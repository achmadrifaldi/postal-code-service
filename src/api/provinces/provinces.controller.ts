import { Controller, Post, Inject } from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { BaseResponse } from 'src/common/dto/base-response';
import { Pagination } from 'src/common/dto/pagination';
import { ProvinceResponseInterface } from './interfaces/province-response.interface';

@Controller('provinces')
export class ProvincesController {
  @Inject(ProvincesService)
  private readonly service: ProvincesService;

  @Post()
  public async getAllProvince(): Promise<BaseResponse> {
    const result: Pagination<ProvinceResponseInterface> =
      await this.service.findAll();

    return new BaseResponse({
      message: 'Success',
      data: result,
    });
  }
}
