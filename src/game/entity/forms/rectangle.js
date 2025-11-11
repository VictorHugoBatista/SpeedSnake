import Entity from "./entity";

export default class Rectangle extends Entity {
  constructor(x, y, sizeX, sizeY, type) {
    super(x, y);

    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.type = type;
  }
}
