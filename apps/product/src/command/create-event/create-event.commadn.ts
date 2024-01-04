interface CreateEventCommandData {
  name: string;

  imgOrder: string;
  category: string;
  userId: number;
  description: string;
  restaurantId: number;
  newPrice: number;
  oldPrice: number;
  date: Date;
}
export class CreateEventCommand {
  name: string;
  newPrice: number;
  oldPrice: number;
  date: Date;
  imgOrder: string;
  description: string;
  category: string;
  userId: number;
  restaurantId: number;

  constructor(data: CreateEventCommandData) {
    this.category = data.category;
    this.imgOrder = data.imgOrder;
    this.description = data.description;
    this.name = data.name;
    this.restaurantId = data.restaurantId;
    this.newPrice = data.newPrice;
    this.oldPrice = data.oldPrice;
    this.date = data.date;
    this.userId = data.userId;
  }
}
