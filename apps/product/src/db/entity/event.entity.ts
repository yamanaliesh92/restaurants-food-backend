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

interface EventData {
  name: string;
  imgOrder: string;
  newPrice: number;
  oldPrice: number;
  description: string;
  category: string;
  restaurantId: number;
  userId: number;
  date: Date;
}

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int4' })
  userId: number;

  @Column({ type: 'text', nullable: true })
  imgOrder: string;

  @Column({ type: 'float' })
  oldPrice: number;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column({ type: 'float' })
  newPrice: number;

  @Column({ type: 'text' })
  category: string;

  @JoinColumn()
  @Column({ type: 'float' })
  restaurantId: number;

  @JoinColumn()
  @ManyToOne(() => RestaurantEntity, (a) => a.events)
  restaurant: RestaurantEntity;

  constructor(data: EventData) {
    if (data) {
      this.category = data.category;
      this.newPrice = data.newPrice;
      this.oldPrice = data.oldPrice;
      this.imgOrder = data.imgOrder;
      this.description = data.description;
      this.restaurantId = data.restaurantId;
      this.name = data.name;
      this.date = data.date;
      this.userId = data.userId;
    }
  }
}
