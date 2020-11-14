import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import List from './list';
import Product from './product';

@Entity('list_product')
export default class ListProduct {
  @Column()
  amount: number;

  @Column()
  price: number;

  @PrimaryColumn()
  list_id: number;

  @PrimaryColumn()
  product_id: number;

  @ManyToOne(type => List, list => list.listProduct, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'list_id', referencedColumnName: 'id' })
  list: List;

  @ManyToOne(type => Product, product => product.listProducts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;
}
