import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateDto, PageMetaDto } from '../../common';
import { ListOptionDistrictDto } from './dto/param-list-district.dto';
import { District } from './entities/district.entity';

@Injectable()
export class DistrictService {
  @InjectRepository(District)
  private readonly repository: Repository<District>;

  async findAll(filter: ListOptionDistrictDto): Promise<PaginateDto<District>> {
    try {
      const query = this.repository
        .createQueryBuilder('district')
        .andWhere('province_id = :provinceId', {
          provinceId: filter.provinceId,
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

  async findById(id: number): Promise<District> {
    try {
      return await this.repository.findOneBy({
        id,
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
