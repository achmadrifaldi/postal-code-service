import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseInterface } from './base-response.interface';

export class BaseResponse {
  @ApiProperty()
  public message: string;

  @ApiProperty()
  public data: any;

  constructor(response: BaseResponseInterface) {
    this.message = response.message;
    this.data = response.data;
  }
}
