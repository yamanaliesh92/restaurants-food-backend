export class DeleteUserCommand {
  id: number;
  constructor(dto: Partial<DeleteUserCommand>) {
    Object.assign(this, dto);
  }
}
