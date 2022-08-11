import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SubDistrict } from '../../subdistrict/entities/subdistrict.entity';
import { PostalCode } from '../../postal-code/entities/postal-code.entity';

@Entity()
export class Village {
  @PrimaryColumn({ type: 'bigint' })
  @ApiProperty()
  public id!: number;

  @Column()
  @ApiProperty()
  public name!: string;

  @ManyToOne(() => SubDistrict, (subDistrict) => subDistrict)
  @JoinColumn()
  subDistrict: SubDistrict;

  @OneToMany(() => PostalCode, (postalCode) => postalCode.village)
  postalCodes: PostalCode[];
}
