interface GetOneEventCommandData {
  id: number;
}

export class GetOneEventCommand {
  id: number;

  constructor(data: GetOneEventCommandData) {
    if (data) {
      this.id = data.id;
    }
  }
}
