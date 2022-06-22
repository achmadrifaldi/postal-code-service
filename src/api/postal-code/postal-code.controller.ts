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
import { SearchPostalCodeDto } from './dto';
import { PostalCodeResponseInterface } from './interfaces/postal-code-response.interface';
import { PostalCodeService } from './postal-code.service';

@Controller('postal-code')
export class PostalCodeController {
  @Inject(PostalCodeService)
  private readonly service: PostalCodeService;

  @Post()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({
    status: 200,
    type: BaseResponse,
    description: 'Get list postal code of Indonesia.',
  })
  public async getSubDistricts(
    @Body() body: SearchPostalCodeDto,
  ): Promise<BaseResponse> {
    const result: Pagination<PostalCodeResponseInterface> =
      await this.service.findAll(body);

    return new BaseResponse({
      message: 'Success',
      data: result,
    });
  }
}
