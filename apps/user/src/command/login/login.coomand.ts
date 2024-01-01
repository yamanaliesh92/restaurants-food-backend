interface LoginCommandData {
  email: string;
  password: string;
}

export class LoginCommand {
  email: string;
  password: string;
  constructor(data: LoginCommandData) {
    if (data) {
      this.email = data.email;
      this.password = data.password;
    }
  }
}
