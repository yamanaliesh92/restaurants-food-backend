interface IGetOneCommandData {
  id: number;
}

export class GetOneUserCommand {
  id: number;

  constructor(data: IGetOneCommandData) {
    if (data) {
      this.id = data.id;
    }
  }
}
