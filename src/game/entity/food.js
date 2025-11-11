import { randomInSteps } from "../../helpers/numbers"
import Rectangle from "./forms/rectangle";

import { EntityType } from "../enums/entity-type";

import {
  gameAreaMinPositionPercent,
} from "../constants";

export default class Food extends Rectangle {
  constructor() {
    super(0, 0, 0, 0, EntityType.FOOD);
  }

  generateNewLocation(size) {
    this.sizeX = size;
    this.sizeY = size;
    const minPosition = gameAreaMinPositionPercent;
    const maxPosition = 100 - size;

    this.updatePosition(
      randomInSteps(minPosition, maxPosition, size),
      randomInSteps(minPosition, maxPosition, size),
    );
  }
}

export const objectToFood = (foodObject) => (Object.assign(new Food(), foodObject));
