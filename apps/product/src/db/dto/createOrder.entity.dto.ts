interface CreateOrderEntityDtoData {
  name: string;
  imgOrder: string;
  price: number;
  description: string;
  category: string;
  restaurantId: number;
  userId: number;
}

export class CreateOrderEntityDto {
  name: string;
  imgOrder: string;
  description: string;
  price: number;
  category: string;
  restaurantId: number;
  userId: number;

  constructor(data: CreateOrderEntityDtoData) {
    if (data) {
      this.category = data.category;
      this.price = data.price;
      this.description = data.description;
      this.imgOrder = data.imgOrder;
      this.restaurantId = data.restaurantId;
      this.name = data.name;
      this.userId = data.userId;
    }
  }
}
