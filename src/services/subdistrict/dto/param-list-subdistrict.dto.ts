import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ListOptionDto } from '../../../common/dto';

export class ListOptionSubDistrictDto extends ListOptionDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  public districtId: number;
}
