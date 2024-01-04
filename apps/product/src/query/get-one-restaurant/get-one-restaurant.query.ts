interface GetOneRestaurantQueryData {
  id: number;
}

export class GetOneRestaurantQuery {
  id: number;

  constructor(data: GetOneRestaurantQueryData) {
    this.id = data.id;
  }
}
