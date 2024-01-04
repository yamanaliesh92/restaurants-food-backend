interface GetAllOrdersByUserIDQueryData {
  userId: number;
}

export class GetOrdersQueryByUserId {
  userId: number;

  constructor(dto: GetAllOrdersByUserIDQueryData) {
    if (dto) {
      this.userId = dto.userId;
    }
  }
}
