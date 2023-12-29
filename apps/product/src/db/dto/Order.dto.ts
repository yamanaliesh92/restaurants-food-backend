interface OrderDtoData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  imgOrder: string;
  price: number;
  description: string;
  name: string;
  category: string;
  restaurantId: number;
  userId: number;
}

export class OrderDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  imgOrder: string;
  price: number;
  name: string;
  description: string;
  category: string;
  restaurantId: number;
  userId: number;

  constructor(data: OrderDtoData) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.name = data.name;
    this.imgOrder = data.imgOrder;
    this.category = data.category;
    this.price = data.price;
    this.userId = data.userId;
    this.description = data.description;
    this.restaurantId = data.restaurantId;
  }
}
