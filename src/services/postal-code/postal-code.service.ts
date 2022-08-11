import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateDto, PageMetaDto } from '../../common';
import { ListOptionPostalCodeDto } from './dto/param-list-postal-code.dto';
import { PostalCode } from './entities/postal-code.entity';

@Injectable()
export class PostalCodeService {
  @InjectRepository(PostalCode)
  private readonly repository: Repository<PostalCode>;

  async findAll(
    filter: ListOptionPostalCodeDto,
  ): Promise<PaginateDto<PostalCode>> {
    try {
      const query = this.repository
        .createQueryBuilder('postal_code')
        .andWhere('village_id = :villageId', {
          villageId: filter.villageId,
        });

      if (filter.search) {
        query.andWhere('postal_code ILIKE :search', {
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

  async findById(id: string): Promise<PostalCode> {
    try {
      return await this.repository.findOneBy({
        id,
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
