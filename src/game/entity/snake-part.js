import Square from "./forms/square";

import { EntityType } from "../enums/entity-type";

export default class SnakePart extends Square {
  constructor(x, y, size) {
    super(x, y, size, EntityType.SNAKE);
  }
}

export const objectToSnakePart = (snakePartObject) => (Object.assign(new SnakePart(), snakePartObject));
