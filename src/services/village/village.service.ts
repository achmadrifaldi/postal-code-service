import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateDto, PageMetaDto } from '../../common';
import { ListOptionVillageDto } from './dto/param-list-village.dto';
import { Village } from './entities/village.entity';

@Injectable()
export class VillageService {
  @InjectRepository(Village)
  private readonly repository: Repository<Village>;

  async findAll(filter: ListOptionVillageDto): Promise<PaginateDto<Village>> {
    try {
      const query = this.repository
        .createQueryBuilder('village')
        .andWhere('sub_district_id = :subDistrictId', {
          subDistrictId: filter.subDistrictId,
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

  async findById(id: number): Promise<Village> {
    try {
      return await this.repository.findOneBy({
        id,
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
