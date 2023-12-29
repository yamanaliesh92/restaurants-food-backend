interface CreateRestaurantCommandData {
  name: string;
  address: string;
  userId: number;
}

export class CreateRestaurantCommand {
  name: string;
  address: string;
  userId: number;

  constructor(dto: Partial<CreateRestaurantCommandData>) {
    if (dto) {
      this.name = dto.name;
      this.address = dto.address;
      this.userId = dto.userId;
    }
  }
}
