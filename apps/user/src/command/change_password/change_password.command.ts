export class ChangePasswordCommand {
  password: string;
  id: number;

  constructor(dto: Partial<ChangePasswordCommand>) {
    Object.assign(this, dto);
  }

  static mockChangePasswordCommand() {
    return new ChangePasswordCommand({
      password: 'newPassword',
    });
  }
}
