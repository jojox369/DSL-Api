import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export default class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
