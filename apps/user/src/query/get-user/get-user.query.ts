interface IGetOneCommandData {
  id: number;
}

export class GetUserQuery {
  id: number;

  constructor(data: IGetOneCommandData) {
    this.id = data.id;
  }
}
