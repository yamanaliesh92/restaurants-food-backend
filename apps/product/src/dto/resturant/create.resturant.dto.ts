import { IsNotEmpty, IsString } from 'class-validator';

interface CreateRestaurantData {
  name: string;
  address: string;
}

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  name: string;
  constructor(data: CreateRestaurantData) {
    if (data) {
      this.address = data.address;
      this.name = data.name;
    }
  }
}
