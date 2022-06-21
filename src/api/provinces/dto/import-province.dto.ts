export class ImportProvinceDto {
  public id: number;
  public name: string;

  constructor(body: ImportProvinceDto) {
    this.id = body.id;
    this.name = body.name;
  }
}
