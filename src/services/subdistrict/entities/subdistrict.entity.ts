import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { District } from '../../district/entities/district.entity';
import { Village } from '../../village/entities/village.entity';

@Entity()
export class SubDistrict {
  @PrimaryColumn({ type: 'bigint' })
  @ApiProperty()
  public id: number;

  @Column()
  @ApiProperty()
  public name: string;

  @ManyToOne(() => District, (city) => city.subDistricts)
  @JoinColumn()
  public district: District;

  @OneToMany(() => Village, (village) => village.subDistrict)
  public villages: Village[];
}
