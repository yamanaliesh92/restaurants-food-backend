interface UpdateImgEventCommandData {
  id: number;
  imgOrder: string;
}
export class UpdateImgEventCommand {
  id: number;
  imgOrder: string;

  constructor(data: UpdateImgEventCommandData) {
    if (data) {
      this.id = data.id;
      this.imgOrder = data.imgOrder;
    }
  }
}
