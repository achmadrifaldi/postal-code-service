export class ImportPostalCodeDto {
  public postalCode: string;
  public villageId: number;

  constructor(body: ImportPostalCodeDto) {
    this.postalCode = body.postalCode;
    this.villageId = body.villageId;
  }
}
