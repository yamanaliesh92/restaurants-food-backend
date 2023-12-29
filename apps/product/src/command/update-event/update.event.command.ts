interface UpdateEventData {
  name: string;
  id: number;
  newPrice: number;
  category: string;
  description: string;
  date: Date;
  oldPrice: number;
}

export class UpdateEventCommand {
  id: number;
  name?: string;
  description?: string;
  date?: Date;
  oldPrice?: number;
  newPrice?: number;
  category?: string;

  constructor(data: UpdateEventData) {
    if (data) {
      this.id = data.id;
      this.category = data.category;
      this.newPrice = data.newPrice;
      this.description = data.description;
      this.oldPrice = data.oldPrice;
      this.date = data.date;
      this.name = data.name;
    }
  }
}
