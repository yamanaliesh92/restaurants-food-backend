interface UpdateOrderEntityDtoData {
  name: string;
  imgOrder: string;
  price: number;
  category: string;
  description?: string;
}

export class UpdateOrderEntityDto {
  name?: string;
  imgOrder?: string;
  price?: number;
  description?: string;

  category?: string;

  constructor(data: UpdateOrderEntityDtoData) {
    if (data) {
      this.category = data.category;
      this.price = data.price;
      this.description = data.description;
      this.imgOrder = data.imgOrder;
      this.name = data.name;
    }
  }
}
