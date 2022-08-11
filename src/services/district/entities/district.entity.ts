import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Province } from '../../province/entities/province.entity';
import { SubDistrict } from '../../subdistrict/entities/subdistrict.entity';

@Entity()
export class District {
  @PrimaryColumn({ type: 'bigint' })
  @ApiProperty()
  public id: number;

  @Column()
  @ApiProperty()
  public name: string;

  @ManyToOne(() => Province, (province) => province.cities)
  public province: Province;

  @OneToMany(() => SubDistrict, (subDistrict) => subDistrict.district)
  public subDistricts: SubDistrict[];
}
