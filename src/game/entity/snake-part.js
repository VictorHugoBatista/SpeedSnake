import Rectangle from "./forms/rectangle";

import { EntityType } from "../enums/entity-type";

export default class SnakePart extends Rectangle {
  constructor(x, y, size) {
    super(x, y, size, size, EntityType.SNAKE);
  }
}

export const objectToSnakePart = (snakePartObject) => (Object.assign(new SnakePart(), snakePartObject));
