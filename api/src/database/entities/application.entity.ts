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
import { User } from './user.entity';
import { Race } from './race.entity';
import { RacePrice } from './race-price.entity';

@Entity('applications')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /**
   * Relacija prema korisniku
   */
  @Index('IDX_APPLICATION_USER_ID')
  @Column()
  userId!: string;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;
  /**
   * Relacija prema utrci
   */
  @Index('IDX_APPLICATION_RACE_ID')
  @Column()
  raceId!: string;

  @ManyToOne(() => Race, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'raceId' })
  race!: Race;

  /**
   * Relacija prema cijeni utrke
   */
  @Index('IDX_APPLICATION_RACE_PRICE_ID')
  @Column()
  racePriceId!: string;

  @ManyToOne(() => RacePrice, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'racePriceId' })
  racePrice!: RacePrice;

  /**
   * Status plaćanja
   */
  @Column({ default: false })
  isPaid!: boolean;

  @Column({ default: false })
  isPaidViaApp!: boolean;

  // Standardna audit polja

  @CreateDateColumn({ type: 'timestamptz' })
  dateCreated!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  dateUpdated!: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  dateDeleted?: Date;
}
