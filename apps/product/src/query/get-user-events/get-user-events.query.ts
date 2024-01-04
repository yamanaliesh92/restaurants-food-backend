interface GetUserEventsQueryData {
  userId: number;
}

export class GetUserEventsQuery {
  userId: number;

  constructor(dto: GetUserEventsQueryData) {
    this.userId = dto.userId;
  }
}
