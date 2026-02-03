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
import { Event } from './event.entity';

@Entity('races')
export class Race {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index('IDX_RACE_EVENT_ID')
  @Column()
  eventId!: string;

  @ManyToOne(() => Event, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventId' })
  event!: Event;

  @Column({ default: false })
  isLeagueRace!: boolean;

  @Index('IDX_RACE_NAME')
  @Column({ length: 200 })
  name!: string;

  @Column({ type: 'float' })
  distance!: number;

  @Column({ type: 'timestamptz' })
  dateTimeStart!: Date;

  @Column({ type: 'timestamptz' })
  dateTimeEnd!: Date;

  @Column({ length: 255, nullable: true })
  checkInLocation?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  // Standardna audit polja
  @CreateDateColumn({ type: 'timestamptz' })
  dateCreated!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  dateUpdated!: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  dateDeleted?: Date;
}
