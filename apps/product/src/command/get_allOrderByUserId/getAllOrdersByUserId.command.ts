interface GetAllOrdersByUserIDCommandData {
  userId: number;
}

export class GetAllOrderCommandByUserId {
  userId: number;

  constructor(dto: GetAllOrdersByUserIDCommandData) {
    if (dto) {
      this.userId = dto.userId;
    }
  }
}
