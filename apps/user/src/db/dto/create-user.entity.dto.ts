interface CreateUserEntityDtoDate {
  email: string;
  password: string;
  username: string;
}

export class CreateUserEntityDto {
  email: string;
  password: string;
  username: string;

  constructor(data: CreateUserEntityDtoDate) {
    if (data) {
      this.email = data.email;
      this.password = data.password;

      this.username = data.username;
    }
  }
}
