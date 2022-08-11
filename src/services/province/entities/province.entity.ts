import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { District } from '../../district/entities/district.entity';

@Entity()
export class Province {
  @PrimaryColumn()
  @ApiProperty()
  public id: number;

  @Column()
  @ApiProperty()
  public name: string;

  @OneToMany(() => District, (city) => city.province)
  cities: District[];
}
