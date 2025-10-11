export default class Entity {
  constructor(size, x, y, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = type;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }
}
