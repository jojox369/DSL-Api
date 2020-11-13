import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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
    eager: true,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => ListProduct, listProduct => listProduct.list, {
    eager: true,
  })
  listProduct: ListProduct[];
}
