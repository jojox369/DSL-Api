import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import ListProduct from './ListProduct';

@Entity('product')
export default class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ListProduct, listProduct => listProduct.product)
  listProducts: ListProduct[];
}
