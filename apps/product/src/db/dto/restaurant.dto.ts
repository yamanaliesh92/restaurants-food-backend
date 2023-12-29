interface RestaurantDtoData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  address: string;
  name: string;
  userId: number;
}

export class RestaurantDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  address: string;
  name: string;
  userId: number;

  constructor(data: RestaurantDtoData) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.name = data.name;
    this.address = data.address;
    this.userId = data.userId;
  }
}
