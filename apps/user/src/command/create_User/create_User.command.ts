interface CreateUserCommandData {
  email: string;
  password: string;
  username: string;
  img: string;
}

export class CreateUserCommand {
  email: string;
  password: string;
  username: string;
  img: string;

  constructor(data: CreateUserCommand) {
    if (data) {
      this.email = data.email;
      this.img = data.img;
      this.password = data.password;
      this.username = data.username;
    }
  }
}
