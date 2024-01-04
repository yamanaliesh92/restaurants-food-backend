import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class IdParamDto {
  @Type(() => Number)
  @IsNumber()
  id: number;
}
