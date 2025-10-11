import { randomInSteps } from "../../helpers/numbers"

export default class Food {
  constructor(size, x, y) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.type = "food";
  }

  generateNewLocation(minPosition, maxPosition) {
    this.x = randomInSteps(minPosition, maxPosition, this.size);
    this.y = randomInSteps(minPosition, maxPosition, this.size);
  }
}

export const objectToFood = (foodObject) => (Object.assign(new Food(), foodObject));
