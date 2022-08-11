import { PageMetaDto } from './page-meta.dto';
import { ApiProperty } from '@nestjs/swagger';

/**
 * https://pietrzakadrian.com/blog/how-to-create-pagination-in-nestjs-with-typeorm-swagger
 */
export class PaginateDto<T> {
  @ApiProperty({ isArray: true })
  public content: T[];

  @ApiProperty({ type: () => PageMetaDto })
  public meta: PageMetaDto;

  constructor(content: T[], meta: PageMetaDto) {
    this.content = content;
    this.meta = meta;
  }
}
