import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Club } from './club.entity';

export enum UserType {
  ADMIN = 'ADMIN',
  ORGANIZER = 'ORGANIZER',
  ATHLETE = 'ATHLETE',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum ShirtSize {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'enum', enum: UserType })
  userType!: UserType;

  @Column({ length: 100 })
  firstName!: string;

  @Column({ length: 100 })
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender;

  @Column({ type: 'float', nullable: true })
  weight?: number;

  @Column({ type: 'enum', enum: ShirtSize, nullable: true })
  shirtSize?: ShirtSize;

  @Column({ length: 100, nullable: true })
  city?: string;

  @Column({ length: 100, nullable: true })
  country?: string;

  @Column({ nullable: true })
  clubId?: string;

  @ManyToOne(() => Club, { nullable: true })
  @JoinColumn({ name: 'clubId' })
  club?: Club;

  //** Automatski se postavlja pri kreiranju zapisa */
  @CreateDateColumn({ type: 'timestamptz' })
  dateCreated!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  dateUpdated!: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  dateDeleted?: Date;
}
