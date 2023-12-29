interface GetAllEventsByUserIDCommandData {
  userId: number;
}

export class GetAllEventsCommandByUserId {
  userId: number;

  constructor(dto: GetAllEventsByUserIDCommandData) {
    if (dto) {
      this.userId = dto.userId;
    }
  }
}
