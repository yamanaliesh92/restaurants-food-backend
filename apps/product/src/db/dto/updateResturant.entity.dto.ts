interface UpdateRestaurantEntityDtoData {
  name: string;
  address: string;
}

export class UpdateRestaurantEntityDto {
  name?: string;
  address?: string;

  constructor(data: UpdateRestaurantEntityDtoData) {
    if (data) {
      this.address = data.address;
      this.name = data.name;
    }
  }
}
