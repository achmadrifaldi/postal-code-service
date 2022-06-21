import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { SubDistrict } from 'src/api/sub-districts/entities/sub-district.entity';
import { PostalCode } from 'src/api/postal-code/entities/postal-code.entity';

@Entity()
export class Village extends BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  public id!: number;

  @Column({ type: 'varchar', length: 255 })
  public name!: string;

  @ManyToOne(() => SubDistrict, (subDistrict) => subDistrict)
  @JoinColumn({ name: 'sub_district_id' })
  subDistrict: SubDistrict;

  @Column({ name: 'sub_district_id', type: 'bigint' })
  public subDistrictId: number;

  @OneToMany(() => PostalCode, (postalCode) => postalCode.village)
  postalCodes: PostalCode[];
}
