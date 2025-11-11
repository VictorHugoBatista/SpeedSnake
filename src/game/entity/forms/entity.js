export default class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }

  getStringPosition() {
    return `${this.x}_${this.y}`;
  }
}
