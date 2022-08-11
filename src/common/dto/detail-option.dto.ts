import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DetailOptionDto {
  @ApiPropertyOptional()
  @IsUUID()
  public id: string;
}
