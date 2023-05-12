import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './addresses.entity';
import { Schedule } from './schedules.entity';
import { Category } from './categories.entity';

@Entity('real_estate')
export class RealEstate {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'boolean', default: false })
  sold: boolean;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  value: number | string;

  @Column({ type: 'integer' })
  size: number;

  @CreateDateColumn({ type: 'date' })
  createdAt?: string | Date;

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: string | Date;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => Schedule, (schedule) => schedule.realEstate)
  schedules: Schedule[];

  @ManyToOne(() => Category, (category) => category.realEstate)
  category: Category;
}
