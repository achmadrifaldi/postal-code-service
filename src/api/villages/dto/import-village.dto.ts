export class ImportVillageDto {
  public id: number;
  public name: string;
  public subDistrictId: number;

  constructor(body: ImportVillageDto) {
    this.id = body.id;
    this.name = body.name;
    this.subDistrictId = body.subDistrictId;
  }
}
