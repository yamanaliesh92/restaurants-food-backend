import { IsOptional, IsString } from 'class-validator';

interface UpdateRestauranData {
  name: string;
  address: string;
}

export class UpdateRestaurantDto {
  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  name: string;
  constructor(data: UpdateRestauranData) {
    if (data) {
      this.address = data.address;
      this.name = data.name;
    }
  }
}
