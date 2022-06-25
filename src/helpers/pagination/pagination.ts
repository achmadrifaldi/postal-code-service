import { PaginationResultInterface } from './pagination-result.interface';

export class Pagination<PaginationEntity> {
  public content: PaginationEntity[];
  public size: number;
  public totalData: number;

  constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
    this.content = paginationResults.content;
    this.size = paginationResults.content.length;
    this.totalData = paginationResults.totalData;
  }
}
