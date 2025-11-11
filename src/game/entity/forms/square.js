import Entity from "./entity";

export default class Square extends Entity {
  constructor(x, y, size, type) {
    super(x, y);

    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
  }
}
