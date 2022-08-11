import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Village } from '../../village/entities/village.entity';

@Entity()
export class PostalCode {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  public id: string;

  @Column()
  @ApiProperty()
  public postalCode: string;

  @ManyToOne(() => Village, (village) => village.postalCodes)
  @JoinColumn()
  village: Village;
}
