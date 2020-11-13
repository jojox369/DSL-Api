import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import List from './list';

@Entity('user')
export default class User {
  /* constructor(id: number, name: string, username?: string, password?: string) {
    this.id = id;
    this.name = name;
    if (username) {
      this.username = username;
    }
    if (password) {
      this.password = password;
    }
  } */

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(type => List, list => list.user)
  lists: List[];
}
