import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

interface CreateEventData {
  name: string;
  restaurantId: number;
  newPrice: number;
  oldPrice: number;
  date: string;
  description: string;
  category: string;
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  date: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  oldPrice: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  newPrice: number;

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
  constructor(data: CreateEventData) {
    if (data) {
      this.description = data.description;
      this.name = data.name;
      this.restaurantId = data.restaurantId;
      this.date = data.date;
      this.oldPrice = data.oldPrice;
      this.newPrice = data.newPrice;
      this.category = data.category;
    }
  }
}
