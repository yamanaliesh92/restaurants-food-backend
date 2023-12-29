interface DeleteOrderCommandData {
  id: number;
}

export class DeleteOrderCommand {
  id: number;

  constructor(data: DeleteOrderCommandData) {
    if (data) {
      this.id = data.id;
    }
  }
}
