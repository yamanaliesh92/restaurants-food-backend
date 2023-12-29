import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';
import { OrderEntity } from './order.entity';
interface RestaurantData {
  name: string;
  userId: number;
  address: string;
}
@Entity('restaurant')
export class RestaurantEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'int4' })
  userId: number;

  @JoinColumn()
  @OneToMany(() => OrderEntity, (a) => a.restaurant)
  orders: OrderEntity[];

  @JoinColumn()
  @OneToMany(() => EventEntity, (a) => a.restaurant)
  events: EventEntity[];

  constructor(data: RestaurantData) {
    if (data) {
      this.name = data.name;
      this.userId = data.userId;
      this.address = data.address;
    }
  }
}
