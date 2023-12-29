interface UpdateUserCommandData {
  id: number;
  username: string;
}

export class UpdateUserCommand {
  id: number;
  username: string;
  constructor(data: UpdateUserCommandData) {
    if (data) {
      this.id = data.id;
      this.username = data.username;
    }
  }
}
