import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import List from './list';

@Entity('user')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(type => List, user => User)
  lists: List[];
}
