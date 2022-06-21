// base.entity.ts
import {
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  /*
   * Create, Update and Delete Date Columns
   */

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: string;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  public createdBy: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  public updatedAt: string;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  public updatedBy: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  public deletedAt: string;

  @Column({ name: 'deleted_by', type: 'uuid', nullable: true })
  public deletedBy: string;
}
