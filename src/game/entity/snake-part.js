import Entity from "./entity";

export default class SnakePart extends Entity {
  constructor(size, x, y) {
    super(size, x, y, "snake");

    this.x = x;
    this.y = y;
    this.size = size;
  }
}
