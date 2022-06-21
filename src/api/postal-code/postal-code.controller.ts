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
import { PostalCodeResponseInterface } from './interfaces/postal-code-response.interface';
import { PostalCodeService } from './postal-code.service';

@Controller('postal-code')
export class PostalCodeController {
  @Inject(PostalCodeService)
  private readonly service: PostalCodeService;

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async getSubDistricts(@Body() body: SearchDto): Promise<BaseResponse> {
    const result: Pagination<PostalCodeResponseInterface> =
      await this.service.findAll(body);

    return new BaseResponse({
      message: 'Success',
      data: result,
    });
  }
}
