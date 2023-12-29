import { AggregateRoot } from '@nestjs/cqrs';

interface EventModelData {
  id: number;
  name: string;
  imgOrder: string;
  newPrice: number;
  userId: number;
  date: Date;
  oldPrice: number;
  category: string;
  description: string;
  restaurantId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Event extends AggregateRoot {
  #id: number;
  #name: string;
  #imgOrder: string;
  #newPrice: number;
  #oldPrice: number;

  #restaurantId: number;
  #category: string;
  #userId: number;
  #description: string;
  #createdAt: Date;
  #date: Date;
  #updatedAt: Date;

  get id(): number {
    return this.#id;
  }

  get restaurantId(): number {
    return this.#restaurantId;
  }

  get newPrice(): number {
    return this.#newPrice;
  }

  get oldPrice(): number {
    return this.#oldPrice;
  }

  get date(): Date {
    return this.#date;
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

  constructor(data: EventModelData) {
    super();
    this.#id = data.id;
    this.#name = data.name;
    this.#description = data.description;
    this.#category = data.category;
    this.#imgOrder = data.imgOrder;
    this.#date = data.date;
    this.#newPrice = data.newPrice;
    this.#oldPrice = data.oldPrice;
    this.#userId = data.userId;
    this.#restaurantId = data.restaurantId;
    this.#createdAt = data.createdAt;
    this.#updatedAt = data.updatedAt;
  }
}
