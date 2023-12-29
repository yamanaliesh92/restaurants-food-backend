import { IsNotEmpty, IsString } from 'class-validator';
interface LoginData {
  username: string;
  password: string;
  email: string;
}
export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  constructor(data: LoginData) {
    if (data) {
      this.password = data.password;
      this.email = data.email;
    }
  }
}
