import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from 'src/api/shared/entities/base.entity';
import { Province } from 'src/api/provinces/entities/province.entity';
import { SubDistrict } from 'src/api/sub-districts/entities/sub-district.entity';

@Entity()
export class City extends BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  public id!: number;

  @Column({ type: 'varchar', length: 255 })
  public name!: string;

  @ManyToOne(() => Province, (province) => province.cities)
  @JoinColumn({ name: 'province_id' })
  province: Province;

  @Column({ name: 'province_id', type: 'bigint' })
  public provinceId: number;

  @OneToMany(() => SubDistrict, (subDistrict) => subDistrict.city)
  subDistricts: SubDistrict[];
}
