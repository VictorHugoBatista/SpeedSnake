import { randomInSteps } from "../../helpers/numbers"
import Entity from "./entity";

import { EntityType } from "../enums/entity-type";

export default class Food extends Entity {
  constructor(size, x, y) {
    super(size, x, y, EntityType.FOOD);

    this.x = x;
    this.y = y;
    this.size = size;
  }

  generateNewLocation(minPosition, maxPosition) {
    this.updatePosition(
      randomInSteps(minPosition, maxPosition, this.size),
      randomInSteps(minPosition, maxPosition, this.size),
    );
  }
}

export const objectToFood = (foodObject) => (Object.assign(new Food(), foodObject));
