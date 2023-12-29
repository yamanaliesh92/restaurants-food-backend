import { IsNotEmpty, IsString } from 'class-validator';
interface UpdateUserNameData {
  username: string;
}
export class UpdateUserNameDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  constructor(data: UpdateUserNameData) {
    if (data) {
      this.username = data.username;
    }
  }
}
