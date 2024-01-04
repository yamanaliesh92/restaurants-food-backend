interface GetOneEventQueryData {
  id: number;
}

export class GetOneEventQuery {
  id: number;

  constructor(data: GetOneEventQueryData) {
    this.id = data.id;
  }
}
