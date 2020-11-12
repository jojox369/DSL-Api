import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import User from './User';
import ListProduct from './ListProduct';

@Entity('list')
export default class List {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(type => User, user => user.lists, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
  @OneToMany(() => ListProduct, listProduct => listProduct.list)
  listProduct: ListProduct[];
}
