import { RestaurantEntity } from './restaurant.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Base } from 'y/lib/base.entity';

interface OrderData {
  name: string;
  imgOrder: string;
  price: number;
  description: string;
  category: string;
  restaurantId: number;
  userId: number;
}

@Entity('Order')
export class OrderEntity extends Base {
  // @PrimaryGeneratedColumn('increment')
  // id: number;
  // @CreateDateColumn({ type: 'timestamptz' })
  // createdAt: Date;
  // @UpdateDateColumn({ type: 'timestamptz' })
  // updatedAt: Date;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int4' })
  userId: number;

  @Column({ type: 'text', nullable: true })
  imgOrder: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'text' })
  category: string;

  @JoinColumn()
  @Column({ type: 'float', nullable: true })
  restaurantId: number;

  @JoinColumn()
  @ManyToOne(() => RestaurantEntity, (a) => a.orders)
  restaurant: RestaurantEntity;

  constructor(data: OrderData) {
    super();
    if (data) {
      this.category = data.category;
      this.price = data.price;
      this.imgOrder = data.imgOrder;
      this.description = data.description;
      this.restaurantId = data.restaurantId;
      this.name = data.name;
      this.userId = data.userId;
    }
  }
}
