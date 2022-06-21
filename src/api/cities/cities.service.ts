import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination } from 'src/common/dto/pagination';
import { City } from './entities/city.entity';
import { CityResponseInterface } from './interfaces/city-response.interface';
import { ImportCityDto } from './dto/import-city.dto';

@Injectable()
export class CitiesService {
  @InjectRepository(City)
  private readonly repository: Repository<City>;

  public async findAll(payload): Promise<Pagination<CityResponseInterface>> {
    const totalData = await this.repository
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.province', 'province')
      .where(`province.name ilike :province`, {
        province: `%${payload.province}%`,
      })
      .getCount();

    const content = await this.repository
      .createQueryBuilder('city')
      .leftJoinAndSelect('city.province', 'province')
      .select(['city.id', 'city.name', 'province.name'])
      .where(`province.name ilike :province`, {
        province: `%${payload.province}%`,
      })
      .andWhere(`city.name ilike :search`, { search: `%${payload.search}%` })
      .take(payload.size)
      .skip(payload.page)
      .getMany();

    return new Pagination<CityResponseInterface>({
      content,
      totalData,
    });
  }

  public async importCities(payload: ImportCityDto[]): Promise<any> {
    return await this.repository
      .createQueryBuilder('city')
      .insert()
      .into(City)
      .values(payload)
      .execute();
  }
}
