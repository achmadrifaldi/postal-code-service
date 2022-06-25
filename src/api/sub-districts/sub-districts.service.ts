import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination } from 'src/helpers/pagination';
import { SubDistrict } from './entities/sub-district.entity';
import { SubDistrictResponseInterface } from './interfaces/sub-district-response.interface';
import { ImportSubDistrictDto } from './dto/import-sub-district.dto';

@Injectable()
export class SubDistrictsService {
  @InjectRepository(SubDistrict)
  private readonly repository: Repository<SubDistrict>;

  public async findAll(
    payload,
  ): Promise<Pagination<SubDistrictResponseInterface>> {
    const totalData = await this.repository
      .createQueryBuilder('sub_district')
      .leftJoinAndSelect('sub_district.city', 'city')
      .leftJoinAndSelect('city.province', 'province')
      .where(`city.name ilike :city`, {
        city: `%${payload.city}%`,
      })
      .andWhere(`province.name ilike :province`, {
        province: `%${payload.province}%`,
      })
      .andWhere(`sub_district.name ilike :search`, {
        search: `%${payload.search}%`,
      })
      .getCount();

    const content = await this.repository
      .createQueryBuilder('sub_district')
      .leftJoinAndSelect('sub_district.city', 'city')
      .leftJoinAndSelect('city.province', 'province')
      .select(['sub_district.id', 'sub_district.name'])
      .where(`city.name ilike :city`, {
        city: `%${payload.city}%`,
      })
      .andWhere(`province.name ilike :province`, {
        province: `%${payload.province}%`,
      })
      .andWhere(`sub_district.name ilike :search`, {
        search: `%${payload.search}%`,
      })
      .take(payload.size)
      .skip(payload.page)
      .getMany();

    return new Pagination<SubDistrictResponseInterface>({
      content,
      totalData,
    });
  }

  public async importSubDistricts(
    payload: ImportSubDistrictDto[],
  ): Promise<any> {
    return await this.repository
      .createQueryBuilder('sub_district')
      .insert()
      .into(SubDistrict)
      .values(payload)
      .execute();
  }
}
