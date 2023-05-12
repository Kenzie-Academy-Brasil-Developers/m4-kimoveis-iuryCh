import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './users.entity';
import { RealEstate } from './realEstate.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  hour: string;

  @ManyToOne(() => RealEstate, (real_estate) => real_estate.schedules)
  realEstate: RealEstate;

  @ManyToOne(() => User, (user) => user.schedules)
  user: User;
}
