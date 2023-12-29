interface GetAllOrdersByCategoryIDCommandData {
  category: string;
}

export class GetAllOrderByCategoryCommand {
  category: string;

  constructor(dto: GetAllOrdersByCategoryIDCommandData) {
    if (dto) {
      this.category = dto.category;
    }
  }
}
