import { getRounds, hash } from 'bcryptjs';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { Schedule } from './schedules.entity';
// import { Schedule } from './schedules.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'varchar', length: 45, unique: true })
  email: string;

  @Column({ type: 'boolean', default: false })
  admin: boolean;

  @Column({ type: 'varchar', length: 120 })
  password: string;

  @CreateDateColumn({ type: 'date' })
  createdAt?: Date | string;

  @UpdateDateColumn({ type: 'date' })
  updatedAt?: Date | string;

  @DeleteDateColumn({ type: 'date' })
  deletedAt?: Date | string;

  @OneToMany(() => Schedule, (schedule) => schedule.user)
  schedules: Schedule[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      const isHashed: number = getRounds(this.password);
      if (!isHashed) {
        this.password = await hash(this.password, 10);
      }
    }
  }
}
