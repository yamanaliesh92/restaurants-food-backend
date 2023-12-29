interface EventDtoData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  imgOrder: string;
  newPrice: number;
  oldPrice: number;
  date: Date;
  name: string;
  category: string;
  restaurantId: number;
  userId: number;
}

export class EventDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  imgOrder: string;
  newPrice: number;

  oldPrice: number;
  date: Date;
  description: string;
  name: string;
  category: string;
  restaurantId: number;
  userId: number;

  constructor(data: EventDtoData) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.name = data.name;
    this.imgOrder = data.imgOrder;
    this.category = data.category;
    this.newPrice = data.newPrice;
    this.oldPrice = data.oldPrice;
    this.date = data.date;
    this.description = data.description;
    this.userId = data.userId;
    this.restaurantId = data.restaurantId;
  }
}
