interface CreateUserCommandData {
  email: string;
  password: string;
  username: string;
}

export class CreateUserCommand {
  email: string;
  password: string;
  username: string;

  constructor(data: CreateUserCommand) {
    if (data) {
      this.email = data.email;
      this.password = data.password;
      this.username = data.username;
    }
  }
}
