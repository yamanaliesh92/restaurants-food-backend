import { IsNotEmpty, IsString } from 'class-validator';
interface CreateUserData {
  username: string;
  password: string;
  email: string;
}
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  constructor(data: CreateUserData) {
    if (data) {
      this.username = data.username;
      this.password = data.password;
      this.email = data.email;
    }
  }
}
