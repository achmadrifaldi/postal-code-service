import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from './entities/province.entity';
import { Pagination } from 'src/helpers/pagination';
import { ProvinceResponseInterface } from './interfaces/province-response.interface';
import { ImportProvinceDto } from './dto/import-province.dto';

@Injectable()
export class ProvincesService {
  @InjectRepository(Province)
  private readonly repository: Repository<Province>;

  public async findAll(): Promise<Pagination<ProvinceResponseInterface>> {
    const totalData = await this.repository
      .createQueryBuilder('province')
      .getCount();

    const content = await this.repository
      .createQueryBuilder('province')
      .select(['province.id', 'province.name'])
      .getMany();

    return new Pagination<ProvinceResponseInterface>({
      content,
      totalData,
    });
  }

  public async importProvinces(payload: ImportProvinceDto[]): Promise<any> {
    return await this.repository
      .createQueryBuilder('province')
      .insert()
      .into(Province)
      .values(payload)
      .execute();
  }
}
