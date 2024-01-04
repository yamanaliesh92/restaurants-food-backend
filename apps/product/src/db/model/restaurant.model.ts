import { AggregateRoot } from '@nestjs/cqrs';

interface RestaurantModelData {
  id: number;
  name: string;
  address: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Restaurant extends AggregateRoot {
  #id: number;
  #address: string;
  #name: string;
  #userId: number;
  #createdAt: Date;
  #updatedAt: Date;

  get id(): number {
    return this.#id;
  }

  get address(): string {
    return this.#address;
  }

  get name(): string {
    return this.#name;
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

  constructor(data: RestaurantModelData) {
    super();
    this.#id = data.id;
    this.#name = data.name;
    this.#address = data.address;
    this.#userId = data.userId;
    this.#createdAt = data.createdAt;
    this.#updatedAt = data.updatedAt;
  }
}
