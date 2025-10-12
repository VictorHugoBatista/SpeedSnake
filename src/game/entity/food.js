import { randomInSteps } from "../../helpers/numbers"
import Entity from "./entity";

import { EntityType } from "../enums/entity-type";

import {
  gameAreaMinPositionPercent,
} from "../constants";

export default class Food extends Entity {
  constructor(size) {
    super(size, 0, 0, EntityType.FOOD);
    this.gameAreaMaxPositionPercent = 100 - size;
  }

  generateNewLocation() {
    const minPosition = gameAreaMinPositionPercent;
    const maxPosition = this.gameAreaMaxPositionPercent;
    this.updatePosition(
      randomInSteps(minPosition, maxPosition, this.size),
      randomInSteps(minPosition, maxPosition, this.size),
    );
  }
}

export const objectToFood = (foodObject) => (Object.assign(new Food(), foodObject));
