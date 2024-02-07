import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
interface CreateUserData {
  amount: number;
}
export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  constructor(data: CreateUserData) {
    if (data) {
      this.amount = data.amount;
    }
  }
}
