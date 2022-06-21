import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class SearchDto {
  @IsString()
  @IsNotEmpty()
  public province: string;

  @IsString()
  @IsNotEmpty()
  public city: string;

  @IsString()
  public search: string;

  @IsNumber()
  public page = 0;

  @IsNumber()
  public size = 10;
}
