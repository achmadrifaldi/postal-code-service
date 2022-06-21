export class ImportSubDistrictDto {
  public id: number;
  public name: string;
  public cityId: number;

  constructor(body: ImportSubDistrictDto) {
    this.id = body.id;
    this.name = body.name;
    this.cityId = body.cityId;
  }
}
