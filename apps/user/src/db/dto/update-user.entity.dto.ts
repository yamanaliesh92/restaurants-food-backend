interface UserEntityDtoDate {
  password: string;
  username: string;
}

export class UpdateUserEntityDto {
  password?: string;
  username?: string;

  constructor(data: UserEntityDtoDate) {
    if (data) {
      this.password = data.password;
      this.username = data.username;
    }
  }
}
