import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class ListOptionDto {
  @ApiPropertyOptional()
  @IsOptional()
  public search: string;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  public limit?: number = 10;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  public offset?: number = 1;

  @ApiPropertyOptional({
    default: false,
  })
  @Type(() => Boolean)
  public disablePaginate?: boolean = false;

  get skip(): number {
    return (this.offset - 1) * this.limit;
  }
}
