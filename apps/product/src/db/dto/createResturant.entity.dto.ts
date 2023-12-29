interface CreateRestaurantEntityDtoData {
  name: string;
  address: string;
  userId: number;
}

export class CreateRestaurantEntityDto {
  name: string;
  address: string;
  userId: number;

  constructor(data: CreateRestaurantEntityDtoData) {
    if (data) {
      this.address = data.address;
      this.name = data.name;
      this.userId = data.userId;
    }
  }
}
