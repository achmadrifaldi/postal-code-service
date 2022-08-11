import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListOptionDto, PaginateDto, PageMetaDto } from '../../common';
import { Province } from './entities/province.entity';

@Injectable()
export class ProvinceService {
  @InjectRepository(Province)
  private readonly repository: Repository<Province>;

  async findAll(filter: ListOptionDto): Promise<PaginateDto<Province>> {
    try {
      const query = this.repository.createQueryBuilder('province');

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

  async findById(id: number): Promise<Province> {
    try {
      return await this.repository.findOneBy({
        id,
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
