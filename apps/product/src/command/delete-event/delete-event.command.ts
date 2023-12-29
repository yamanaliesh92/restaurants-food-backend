interface DeleteEventCommandData {
  id: number;
}

export class DeleteEventCommand {
  id: number;

  constructor(data: DeleteEventCommandData) {
    if (data) {
      this.id = data.id;
    }
  }
}
