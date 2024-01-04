interface GetOrderQueryData {
  id: number;
}

export class GetOrderQuery {
  id: number;

  constructor(data: GetOrderQueryData) {
    if (data) {
      this.id = data.id;
    }
  }
}
