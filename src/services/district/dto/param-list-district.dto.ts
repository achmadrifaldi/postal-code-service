import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ListOptionDto } from '../../../common/dto';

export class ListOptionDistrictDto extends ListOptionDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  public provinceId: number;
}
