import { AggregateRoot } from '@nestjs/cqrs';

interface OrderModelData {
  id: number;
  name: string;
  description: string;
  imgOrder: string;
  price: number;
  userId: number;
  category: string;
  restaurantId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Order extends AggregateRoot {
  #id: number;
  #name: string;
  #imgOrder: string;
  #price: number;
  #restaurantId: number;
  #category: string;
  #userId: number;
  #description: string;
  #createdAt: Date;
  #updatedAt: Date;

  get id(): number {
    return this.#id;
  }

  get restaurantId(): number {
    return this.#restaurantId;
  }

  get price(): number {
    return this.#price;
  }

  get name(): string {
    return this.#name;
  }

  get description(): string {
    return this.#description;
  }

  get imgOrder(): string {
    return this.#imgOrder;
  }

  get category(): string {
    return this.#category;
  }

  get userId(): number {
    return this.#userId;
  }
  get createdAt(): Date {
    return this.#createdAt;
  }

  get updatedAt(): Date {
    return this.#updatedAt;
  }

  constructor(data: OrderModelData) {
    super();
    this.#id = data.id;
    this.#name = data.name;
    this.#category = data.category;
    this.#imgOrder = data.imgOrder;
    this.#price = data.price;

    this.#description = data.description;
    this.#userId = data.userId;
    this.#restaurantId = data.restaurantId;
    this.#createdAt = data.createdAt;
    this.#updatedAt = data.updatedAt;
  }
}
