import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Village } from 'src/api/villages/entities/village.entity';

@Entity()
export class PostalCode extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ name: 'postal_code', type: 'varchar', length: 255 })
  public postalCode!: string;

  @ManyToOne(() => Village, (village) => village.postalCodes)
  @JoinColumn({ name: 'village_id' })
  village: Village;

  @Column({ name: 'village_id', type: 'bigint' })
  public villageId: number;
}
