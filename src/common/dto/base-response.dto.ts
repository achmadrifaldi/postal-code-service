import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto<T> {
  @ApiProperty()
  public statusCode: number;

  @ApiProperty()
  public message: string;

  @ApiProperty()
  public data: T;

  constructor(data: any) {
    this.statusCode = data.statusCode;
    this.message = data.message;
    this.data = data.data;
  }
}
