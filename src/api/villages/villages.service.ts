import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination } from 'src/common/dto/pagination';
import { Village } from './entities/village.entity';
import { VillageResponseInterface } from './interfaces/village-response.interface';
import { ImportVillageDto } from './dto/import-village.dto';

@Injectable()
export class VillagesService {
  @InjectRepository(Village)
  private readonly repository: Repository<Village>;

  public async findAll(payload): Promise<Pagination<VillageResponseInterface>> {
    const totalData = await this.repository
      .createQueryBuilder('village')
      .leftJoinAndSelect('village.subDistrict', 'subDistrict')
      .leftJoinAndSelect('subDistrict.city', 'city')
      .leftJoinAndSelect('city.province', 'province')
      .where(`subDistrict.name ilike :subDistrict`, {
        subDistrict: `%${payload.subDistrict}%`,
      })
      .andWhere(`city.name ilike :city`, {
        city: `%${payload.city}%`,
      })
      .andWhere(`province.name ilike :province`, {
        province: `%${payload.province}%`,
      })
      .andWhere(`village.name ilike :search`, {
        search: `%${payload.search}%`,
      })
      .getCount();

    const content = await this.repository
      .createQueryBuilder('village')
      .leftJoinAndSelect('village.subDistrict', 'subDistrict')
      .leftJoinAndSelect('subDistrict.city', 'city')
      .leftJoinAndSelect('city.province', 'province')
      .select(['village.id', 'village.name'])
      .where(`subDistrict.name ilike :subDistrict`, {
        subDistrict: `%${payload.subDistrict}%`,
      })
      .andWhere(`city.name ilike :city`, {
        city: `%${payload.city}%`,
      })
      .andWhere(`province.name ilike :province`, {
        province: `%${payload.province}%`,
      })
      .andWhere(`village.name ilike :search`, {
        search: `%${payload.search}%`,
      })
      .take(payload.size)
      .skip(payload.page)
      .getMany();

    return new Pagination<VillageResponseInterface>({
      content,
      totalData,
    });
  }

  public async importVillage(payload: ImportVillageDto[]): Promise<any> {
    return await this.repository
      .createQueryBuilder('village')
      .insert()
      .into(Village)
      .values(payload)
      .execute();
  }
}
