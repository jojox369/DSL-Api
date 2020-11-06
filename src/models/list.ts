import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import User from './user';
import Product from './product';

@Entity()
export default class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @ManyToMany(type => Product, { eager: true, cascade: ['insert', 'update'] })
  @JoinTable({
    name: 'list_product',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'list_id',
      referencedColumnName: 'id',
    },
  })
  products: Product;

  @ManyToOne(type => User, lists => List, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
