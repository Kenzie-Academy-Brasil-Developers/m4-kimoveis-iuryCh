import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RealEstate } from './realEstate.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 45, unique: true })
  name: string;

  @OneToMany(() => RealEstate, (real_estate) => real_estate.category)
  realEstate: RealEstate;
}
