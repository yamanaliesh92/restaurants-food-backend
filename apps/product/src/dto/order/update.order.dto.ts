import { IsNumber, IsOptional, IsString } from 'class-validator';

interface UpdateOrderData {
  name: string;
  restaurantId: number;
  price: number;
  description: string;
  category: string;
}

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  category: string;

  @IsOptional()
  @IsString()
  name: string;
  constructor(data: UpdateOrderData) {
    if (data) {
      this.description = data.description;
      this.name = data.name;
      this.price = data.price;
      this.category = data.category;
    }
  }
}
