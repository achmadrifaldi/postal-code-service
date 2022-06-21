import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { City } from 'src/api/cities/entities/city.entity';

@Entity()
export class Province extends BaseEntity {
  @PrimaryColumn({ type: 'bigint' })
  public id!: number;

  @Column({ type: 'varchar', length: 255 })
  public name!: string;

  @OneToMany(() => City, (city) => city.province)
  cities: City[];
}
