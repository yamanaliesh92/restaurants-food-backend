interface GetAllOrdersByCategoryIDCommandData {
  category: string;
}

export class GetOrdersByCategoryQuery {
  category: string;

  constructor(dto: GetAllOrdersByCategoryIDCommandData) {
    if (dto) {
      this.category = dto.category;
    }
  }
}
