import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('race_prices')
export class RacePrice {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // Vrijednost cijene
  @Column({ type: 'float' })
  value!: number;

  // Valuta
  @Column({ length: 10 })
  mainCurrency!: string; // npr. 'EUR', 'USD', 'HRK'

  // Do kada vrijedi ova ponuda
  @Column({ type: 'date', nullable: true })
  validUntil?: Date;

  // Oznaka da li je ovo posljednja (trenutna) ponuda za utrku
  @Column({ default: false })
  isLastOffer!: boolean;

  // Standardna audit polja
  @CreateDateColumn({ type: 'timestamptz' })
  dateCreated!: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  dateUpdated!: Date;
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  dateDeleted?: Date;
}
