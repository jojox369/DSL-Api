import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import List from './list';
import Product from './Product';

@Entity('list_product')
export default class ListProduct {
  @Column()
  amount: number;

  @PrimaryColumn()
  list_id: number;

  @PrimaryColumn()
  product_id: number;

  @ManyToOne(type => List, list => list.listProduct, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'list_id', referencedColumnName: 'id' })
  list: List;

  @ManyToOne(type => Product, product => product.listProducts, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;
}
