interface UpdateImgCommandData {
  id: number;
  img: string;
}

export class UpdateImgCommand {
  id: number;
  img: string;
  constructor(data: UpdateImgCommandData) {
    if (data) {
      this.id = data.id;
      this.img = data.img;
    }
  }
}
