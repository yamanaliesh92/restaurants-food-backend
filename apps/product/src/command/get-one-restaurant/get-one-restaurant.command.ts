interface GetOneRestaurantCommandData {
  id: number;
}

export class GetOneRestaurantCommand {
  id: number;

  constructor(data: GetOneRestaurantCommandData) {
    if (data) {
      this.id = data.id;
    }
  }
}
