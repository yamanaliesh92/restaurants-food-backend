import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

interface CreateOrderData {
  name: string;
  restaurantId: number;
  price: number;
  description: string;
  category: string;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  restaurantId: number;

  @IsString()
  @IsNotEmpty()
  name: string;
  constructor(data: CreateOrderData) {
    if (data) {
      this.description = data.description;
      this.name = data.name;
      this.restaurantId = data.restaurantId;
      this.price = data.price;
      this.category = data.category;
    }
  }
}
