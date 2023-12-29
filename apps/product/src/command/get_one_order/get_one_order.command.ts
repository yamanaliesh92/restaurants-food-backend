interface GetOneOrderCommandData {
  id: number;
}

export class GetOneOrderCommand {
  id: number;

  constructor(data: GetOneOrderCommandData) {
    if (data) {
      this.id = data.id;
    }
  }
}
