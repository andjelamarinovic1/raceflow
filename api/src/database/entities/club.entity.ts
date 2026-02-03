import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity('clubs')
export class Club {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column({ length: 150 })
  name!: string;

  // Relacija: jedan klub ima više korisnika
  @OneToMany(() => User, (user) => user.club)
  users!: User[];

  // Automatski se postavlja pri kreiranju zapisa
  @CreateDateColumn({ type: 'timestamptz' })
  dateCreated!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  dateUpdated!: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  dateDeleted?: Date;
}
