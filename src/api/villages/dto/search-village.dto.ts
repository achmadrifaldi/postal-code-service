import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class SearchVillageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public province: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public subDistrict: string;

  @ApiProperty()
  @IsString()
  public search: string;

  @IsNumber()
  public page = 0;

  @IsNumber()
  public size = 10;
}
