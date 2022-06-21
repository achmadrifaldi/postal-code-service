export class ImportCityDto {
  public id: number;
  public name: string;
  public provinceId: number;

  constructor(body: ImportCityDto) {
    this.id = body.id;
    this.name = body.name;
    this.provinceId = body.provinceId;
  }
}
