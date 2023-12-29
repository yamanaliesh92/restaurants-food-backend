export class LoginCommand {
  email: string;
  password: string;

  constructor(dto: Partial<LoginCommand>) {
    Object.assign(this, dto);
  }

  static mockLoginCommand() {
    return new LoginCommand({
      email: 'ali@gamil.com',
      password: 'ali1212',
    });
  }
}
