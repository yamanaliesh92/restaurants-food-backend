import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteEventDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
