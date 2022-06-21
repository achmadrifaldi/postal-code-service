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
import { CitiesService } from './cities.service';
import { SearchDto } from './dto';
import { CityResponseInterface } from './interfaces/city-response.interface';

@Controller('cities')
export class CitiesController {
  @Inject(CitiesService)
  private readonly service: CitiesService;

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async getCities(@Body() body: SearchDto): Promise<BaseResponse> {
    const result: Pagination<CityResponseInterface> =
      await this.service.findAll(body);

    return new BaseResponse({
      message: 'Success',
      data: result,
    });
  }
}
