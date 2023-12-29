interface CreateUserEntityDtoDate {
  email: string;
  password: string;
  username: string;
  img: string;
}

export class CreateUserEntityDto {
  email: string;
  password: string;
  username: string;
  img: string;
  constructor(data: CreateUserEntityDtoDate) {
    if (data) {
      this.email = data.email;
      this.password = data.password;
      this.img = data.img;
      this.username = data.username;
    }
  }
}
