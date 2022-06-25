import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'papaparse';
import { ImportProvinceDto } from 'src/api/provinces/dto/import-province.dto';
import { ImportCityDto } from 'src/api/cities/dto/import-city.dto';
import { ImportSubDistrictDto } from 'src/api/sub-districts/dto/import-sub-district.dto';
import { ImportVillageDto } from 'src/api/villages/dto/import-village.dto';
import { ImportPostalCodeDto } from 'src/api/postal-code/dto/import-postal-code.dto';
import { ProvincesService } from 'src/api/provinces/provinces.service';
import { CitiesService } from 'src/api/cities/cities.service';
import { SubDistrictsService } from 'src/api/sub-districts/sub-districts.service';
import { VillagesService } from 'src/api/villages/villages.service';
import { PostalCodeService } from 'src/api/postal-code/postal-code.service';

@Injectable()
export class SampleDataService {
  constructor(
    private provinceService: ProvincesService,
    private cityService: CitiesService,
    private subDistrictService: SubDistrictsService,
    private villageService: VillagesService,
    private postalCodeService: PostalCodeService,
  ) {}

  private chunkArray<EntityArray>(arr: EntityArray[], chunkSize: number) {
    const res = [];
    while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
    }
    return res;
  }

  public async extractProvince(): Promise<any> {
    const csvFile = readFileSync('src/database/factories/csv/provinces.csv');
    const csvData = csvFile.toString();

    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmtyLines: true,
      transformHeaders: (header) =>
        header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });

    const body: ImportProvinceDto[] = [];
    parsedCsv.data.map((item) => {
      body.push({
        id: parseInt(item.Code),
        name: item.Name,
      });
    });

    return await this.provinceService.importProvinces(body);
  }

  public async extractCity(): Promise<any> {
    const csvFile = readFileSync('src/database/factories/csv/cities.csv');
    const csv2File = readFileSync(
      'src/database/factories/csv/kemendagri_code_relation_regency.csv',
    );
    const csvData = csvFile.toString();
    const csv2Data = csv2File.toString();

    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmtyLines: true,
      transformHeaders: (header) =>
        header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });

    const parsed2Csv = await parse(csv2Data, {
      header: true,
      skipEmtyLines: true,
      transformHeaders: (header) =>
        header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });

    const body: ImportCityDto[] = [];
    parsedCsv.data.map((item) => {
      body.push({
        id: parseInt(item.Code),
        name: item.Name,
        provinceId: parseInt(item.Parent),
      });
    });

    parsed2Csv.data.map((item) => {
      const index = body.findIndex((city) => city.id == item.kode_bps);
      if (body[index]) {
        body[index].name = item.nama_dagri;
      }
    });

    return await this.cityService.importCities(body);
  }

  public async extractSubDistrict(): Promise<any> {
    const csvFile = readFileSync('src/database/factories/csv/subDistricts.csv');
    const csvData = csvFile.toString();

    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmtyLines: true,
      transformHeaders: (header) =>
        header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });

    const body: ImportSubDistrictDto[] = [];
    parsedCsv.data.map((item) => {
      if (parseInt(item.Code) != NaN && parseInt(item.Parent) != NaN) {
        body.push({
          id: parseInt(item.Code),
          name: item.Name,
          cityId: parseInt(item.Parent),
        });
      }
    });

    return await this.subDistrictService.importSubDistricts(body);
  }

  public async extractVillage(): Promise<any> {
    const csvFile = readFileSync('src/database/factories/csv/villages.csv');
    const csvData = csvFile.toString();

    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmtyLines: true,
      transformHeaders: (header) =>
        header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });

    const body: ImportVillageDto[] = [];
    parsedCsv.data.map((item) => {
      if (parseInt(item.Code) != NaN && parseInt(item.Parent) != NaN) {
        body.push({
          id: parseInt(item.Code),
          name: item.Name,
          subDistrictId: parseInt(item.Parent),
        });
      }
    });

    for (const chunkItem of this.chunkArray<ImportVillageDto>(body, 1000)) {
      await this.villageService.importVillage(chunkItem);
    }
  }

  public async extractPostalCode(): Promise<any> {
    const csvFile = readFileSync('src/database/factories/csv/villages.csv');
    const csvData = csvFile.toString();

    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmtyLines: true,
      transformHeaders: (header) =>
        header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });

    const body: ImportPostalCodeDto[] = [];
    parsedCsv.data.map((item) => {
      if (parseInt(item.Code) != NaN && parseInt(item.Parent) != NaN) {
        body.push({
          villageId: parseInt(item.Code),
          postalCode:
            item.Postal.split(',').length > 1
              ? item.Postal.split(',')[item.Postal.split(',').length - 1]
              : item.Postal,
        });
      }
    });

    for (const chunkItem of this.chunkArray<ImportPostalCodeDto>(body, 1000)) {
      await this.postalCodeService.importPostalCode(chunkItem);
    }
  }
}
