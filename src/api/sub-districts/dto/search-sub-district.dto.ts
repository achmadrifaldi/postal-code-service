import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class SearchSubDistrictDto {
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
  public search?: string;

  @IsNumber()
  public page = 0;

  @IsNumber()
  public size = 10;
}
