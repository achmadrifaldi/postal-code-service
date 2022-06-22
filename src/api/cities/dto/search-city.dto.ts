import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class SearchCityDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public province: string;

  @ApiProperty()
  @IsString()
  public search: string;

  @IsNumber()
  public page = 0;

  @IsNumber()
  public size = 10;
}
