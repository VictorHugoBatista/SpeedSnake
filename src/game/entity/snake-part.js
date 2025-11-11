import Entity from "./entity";

import { EntityType } from "../enums/entity-type";

export default class SnakePart extends Entity {
  constructor(size, x, y) {
    super(size, x, y, EntityType.SNAKE);
  }
}

export const objectToSnakePart = (snakePartObject) => (Object.assign(new SnakePart(), snakePartObject));
