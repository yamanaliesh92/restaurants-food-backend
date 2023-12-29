interface UpdateOrderEntityDtoData {
  name: string;
  imgOrder: string;
  newPrice: number;
  oldPrice: number;
  description: string;
  category: string;
  date: Date;
}

export class UpdateEventEntityDto {
  name?: string;
  imgOrder?: string;
  newPrice?: number;
  oldPrice?: number;
  description?: string;
  category?: string;
  date?: Date;

  constructor(data: UpdateOrderEntityDtoData) {
    if (data) {
      this.category = data.category;
      this.newPrice = data.newPrice;
      this.oldPrice = data.oldPrice;
      this.description = data.description;
      this.imgOrder = data.imgOrder;
      this.name = data.name;
    }
  }
}
