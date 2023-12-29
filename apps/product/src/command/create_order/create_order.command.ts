interface CreateOrderCommandData {
  name: string;
  price: number;
  imgOrder: string;
  category: string;
  userId: number;
  description: string;
  restaurantId: number;
}
export class CreateOrderCommand {
  name: string;
  price: number;
  imgOrder: string;
  description: string;
  category: string;
  userId: number;
  restaurantId: number;

  constructor(data: CreateOrderCommandData) {
    if (data) {
      this.category = data.category;
      this.imgOrder = data.imgOrder;
      this.description = data.description;
      this.name = data.name;
      this.restaurantId = data.restaurantId;
      this.price = data.price;
      this.userId = data.userId;
    }
  }
}
