interface UpdateImgOrderCommandData {
  id: number;
  imgOrder: string;
}

export class UpdateImgOrderCommand {
  id: number;
  imgOrder: string;
  constructor(data: UpdateImgOrderCommandData) {
    if (data) {
      this.id = data.id;
      this.imgOrder = data.imgOrder;
    }
  }
}
