interface UserEntityDtoDate {
  password: string;
  username: string;
  img: string;
}

export class UpdateUserEntityDto {
  password?: string;
  username?: string;
  img?: string;
  constructor(data: UserEntityDtoDate) {
    if (data) {
      this.password = data.password;
      this.img = data.img;
      this.username = data.username;
    }
  }
}
