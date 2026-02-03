import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { League } from './league.entity';

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  FINISHED = 'FINISHED',
}

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /**
   * Relacija prema ligi
   */
  @Index('IDX_EVENT_LEAGUE_ID')
  @Column({ nullable: true })
  leagueId!: string;

  @ManyToOne(() => League, (league) => league.events, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'leagueId' })
  league!: League;

  @Index('IDX_EVENT_NAME')
  @Column({ length: 200 })
  name!: string;

  @Column({ type: 'timestamptz' })
  dateStart!: Date;

  @Column({ type: 'timestamptz' })
  dateEnd!: Date;

  @Column({ length: 255 })
  location!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.DRAFT,
  })
  status!: EventStatus;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude?: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude?: number;

  //Standardna audit polja
  @CreateDateColumn({ type: 'timestamptz' })
  dateCreated!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  dateUpdated!: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  dateDeleted?: Date;
}
