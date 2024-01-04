import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateEventParamDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  id: number;
}
