export class GetAllOrderCommand {
  constructor(dto: Partial<GetAllOrderCommand>) {
    Object.assign(this, dto);
  }
}
