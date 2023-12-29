interface UpdateOrderData {
  name: string;
  id: number;
  price: number;
  category: string;
  description?: string;
}

export class UpdateOrderCommand {
  id: number;
  name?: string;

  price?: number;
  description?: string;

  category?: string;

  constructor(data: UpdateOrderData) {
    if (data) {
      this.id = data.id;
      this.category = data.category;
      this.price = data.price;
      this.description = data.description;

      this.name = data.name;
    }
  }
}
