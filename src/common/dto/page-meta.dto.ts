import { ApiProperty } from '@nestjs/swagger';

export class PageMetaDto {
  @ApiProperty()
  public totalData: number;

  @ApiProperty()
  public total: number;

  @ApiProperty()
  public size: number;

  @ApiProperty()
  public page: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage?: boolean = false;

  @ApiProperty()
  readonly hasNextPage?: boolean = false;

  constructor(data: any) {
    this.totalData = data.totalData;
    this.total = data.total;
    this.size = data.size;
    this.page = data.page;
    this.pageCount = Math.ceil(this.totalData / this.size);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
