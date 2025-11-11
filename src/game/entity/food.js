import { randomInSteps } from "../../helpers/numbers"
import Square from "./forms/square";

import { EntityType } from "../enums/entity-type";

import {
  gameAreaMinPositionPercent,
} from "../constants";

export default class Food extends Square {
  constructor() {
    super(0, 0, 0, EntityType.FOOD);
  }

  generateNewLocation(size) {
    this.size = size;
    const minPosition = gameAreaMinPositionPercent;
    const maxPosition = 100 - this.size;

    this.updatePosition(
      randomInSteps(minPosition, maxPosition, this.size),
      randomInSteps(minPosition, maxPosition, this.size),
    );
  }
}

export const objectToFood = (foodObject) => (Object.assign(new Food(), foodObject));
