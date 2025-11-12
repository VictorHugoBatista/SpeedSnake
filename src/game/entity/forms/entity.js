export default class Entity {
  constructor(x, y, sizeX, sizeY) {
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }

  getStringPosition() {
    return `${this.x}_${this.y}`;
  }

  isPositionInside(posX, posY) {
    return posX >= this.x && posX < this.x + this.sizeX
      && posY >= this.y && posY < this.y + this.sizeY;
  }
}

export const objectToEntity = (entityObject) => (Object.assign(new Entity(), entityObject));
