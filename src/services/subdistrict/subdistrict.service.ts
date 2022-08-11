import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateDto, PageMetaDto } from '../../common';
import { ListOptionSubDistrictDto } from './dto/param-list-subdistrict.dto';
import { SubDistrict } from './entities/subdistrict.entity';

@Injectable()
export class SubDistrictService {
  @InjectRepository(SubDistrict)
  private readonly repository: Repository<SubDistrict>;

  async findAll(
    filter: ListOptionSubDistrictDto,
  ): Promise<PaginateDto<SubDistrict>> {
    try {
      const query = this.repository
        .createQueryBuilder('sub_district')
        .andWhere('district_id = :districtId', {
          districtId: filter.districtId,
        });

      if (filter.search) {
        query.andWhere('name ILIKE :search', {
          search: `%${filter.search}%`,
        });
      }

      if (!filter.disablePaginate) {
        query.take(filter.limit);
        query.skip(filter.skip);
      }

      const [data, totalData] = await query.getManyAndCount();
      const total = data.length;

      const meta = new PageMetaDto({
        totalData,
        total,
        page: filter.offset,
        size: filter.disablePaginate ? totalData : filter.limit,
      });

      return new PaginateDto(data, meta);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findById(id: number): Promise<SubDistrict> {
    try {
      return await this.repository.findOneBy({
        id,
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
