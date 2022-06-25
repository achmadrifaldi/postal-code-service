import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination } from 'src/helpers/pagination';
import { PostalCode } from './entities/postal-code.entity';
import { PostalCodeResponseInterface } from './interfaces/postal-code-response.interface';
import { ImportPostalCodeDto } from './dto/import-postal-code.dto';

@Injectable()
export class PostalCodeService {
  @InjectRepository(PostalCode)
  private readonly repository: Repository<PostalCode>;

  public async findAll(
    payload,
  ): Promise<Pagination<PostalCodeResponseInterface>> {
    const totalData = await this.repository
      .createQueryBuilder('postal_code')
      .leftJoinAndSelect('postal_code.village', 'village')
      .leftJoinAndSelect('village.subDistrict', 'subDistrict')
      .leftJoinAndSelect('subDistrict.city', 'city')
      .leftJoinAndSelect('city.province', 'province')
      .where(`village.name ilike :village`, {
        village: `%${payload.village}%`,
      })
      .andWhere(`subDistrict.name ilike :subDistrict`, {
        subDistrict: `%${payload.subDistrict}%`,
      })
      .andWhere(`city.name ilike :city`, {
        city: `%${payload.city}%`,
      })
      .andWhere(`province.name ilike :province`, {
        province: `%${payload.province}%`,
      })
      .andWhere(`postal_code.postal_code ilike :search`, {
        search: `%${payload.search}%`,
      })
      .getCount();

    const content = await this.repository
      .createQueryBuilder('postal_code')
      .leftJoinAndSelect('postal_code.village', 'village')
      .leftJoinAndSelect('village.subDistrict', 'subDistrict')
      .leftJoinAndSelect('subDistrict.city', 'city')
      .leftJoinAndSelect('city.province', 'province')
      .select(['postal_code.id', 'postal_code.postalCode'])
      .where(`village.name ilike :village`, {
        village: `%${payload.village}%`,
      })
      .andWhere(`subDistrict.name ilike :subDistrict`, {
        subDistrict: `%${payload.subDistrict}%`,
      })
      .andWhere(`city.name ilike :city`, {
        city: `%${payload.city}%`,
      })
      .andWhere(`province.name ilike :province`, {
        province: `%${payload.province}%`,
      })
      .andWhere(`postal_code.postal_code ilike :search`, {
        search: `%${payload.search}%`,
      })
      .take(payload.size)
      .skip(payload.page)
      .getMany();

    return new Pagination<PostalCodeResponseInterface>({
      content,
      totalData,
    });
  }

  public async importPostalCode(payload: ImportPostalCodeDto[]): Promise<any> {
    return await this.repository
      .createQueryBuilder('postal_code')
      .insert()
      .into(PostalCode)
      .values(payload)
      .execute();
  }
}
