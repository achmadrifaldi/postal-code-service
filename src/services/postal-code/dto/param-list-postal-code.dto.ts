import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ListOptionDto } from '../../../common/dto';

export class ListOptionPostalCodeDto extends ListOptionDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  public villageId: number;
}
