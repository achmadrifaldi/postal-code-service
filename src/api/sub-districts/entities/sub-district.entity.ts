import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { City } from 'src/api/cities/entities/city.entity';
import { Village } from 'src/api/villages/entities/village.entity';

@Entity()
export class SubDistrict extends BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  public id!: number;

  @Column({ type: 'varchar', length: 255 })
  public name!: string;

  @ManyToOne(() => City, (city) => city.subDistricts)
  @JoinColumn({ name: 'city_id' })
  city: City;

  @Column({ name: 'city_id', type: 'bigint' })
  public cityId: number;

  @OneToMany(() => Village, (village) => village.subDistrict)
  villages: Village[];
}
