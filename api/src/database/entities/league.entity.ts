import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { Event } from './event.entity';

@Entity('leagues')
export class League {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToMany(() => Event, (event) => event.league)
  events!: Event[];

  @Index('IDX_LEAGUE_TITLE')
  @Column({ length: 200 })
  title!: string;

  @Column({ type: 'date' })
  dateStart!: Date;

  @Column({ type: 'date' })
  dateEnd!: Date;

  @Column({ type: 'text', nullable: true })
  description?: string;

  //Automatski audit fieldovi
  @CreateDateColumn({ type: 'timestamptz' })
  dateCreated!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  dateUpdated!: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  dateDeleted?: Date;
}
