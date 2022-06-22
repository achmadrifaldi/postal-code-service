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
import { BaseResponse } from 'src/common/dto/base-response';
import { Pagination } from 'src/common/dto/pagination';
import { CitiesService } from './cities.service';
import { SearchCityDto } from './dto';
import { CityResponseInterface } from './interfaces/city-response.interface';

@Controller('cities')
export class CitiesController {
  @Inject(CitiesService)
  private readonly service: CitiesService;

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'Get list city of Indonesia.',
  })
  public async getCities(@Body() body: SearchCityDto): Promise<BaseResponse> {
    const result: Pagination<CityResponseInterface> =
      await this.service.findAll(body);

    return new BaseResponse({
      message: 'Success',
      data: result,
    });
  }
}
