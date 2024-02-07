interface CreateEventEntityDtoData {
  name: string;
  imgOrder: string;
  newPrice: number;
  oldPrice: number;
  description: string;
  category: string;
  restaurantId: number;
  userId: number;
  date: string;
}

export class CreateEventEntityDto {
  name: string;
  imgOrder: string;
  newPrice: number;
  oldPrice: number;
  description: string;
  category: string;
  restaurantId: number;
  userId: number;
  date: string;

  constructor(data: CreateEventEntityDtoData) {
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
