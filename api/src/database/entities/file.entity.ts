import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column('text')
  url: string;

  @Column()
  mimeType: string;

  @Column('int')
  size: number;

  @CreateDateColumn({ type: 'timestamptz' })
  dateCreated!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  dateUpdated!: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  dateDeleted?: Date;
}
