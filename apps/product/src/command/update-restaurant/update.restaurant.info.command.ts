interface UpdateRestaurantInfoCommandData {
  id: number;
  name: string;
  address: string;
}
export class UpdateRestaurantInfoCommand {
  id: number;
  name?: string;
  address?: string;

  constructor(data: UpdateRestaurantInfoCommandData) {
    if (data) {
      this.id = data.id;
      this.address = data.address;
      this.name = data.name;
    }
  }
}
