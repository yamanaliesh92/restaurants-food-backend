interface UserDtoData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  img: string;
  email: string;
}

export class UserDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  img: string;
  email: string;

  constructor(data: UserDtoData) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.username = data.username;
    this.img = data.img;
    this.email = data.email;
    this.username = data.username;
  }
}
