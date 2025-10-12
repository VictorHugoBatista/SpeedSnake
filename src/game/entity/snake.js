import {
  gameAreaMinPositionPercent,
  initialSnakeHeadPosition,
  initialSnakePartsNumber,
  notAllowedDirectionChanges,
} from "../constants";

import SnakePart from "./snake-part";

import { DirectionEnum } from "../enums/directions";

export default class Snake {
  constructor(snakePartSize, parts) {
    this.direction = "";
    this.snakePartSize = snakePartSize;
    this.parts = parts;
    this.partToExclude = {};
  }

  initializeSnake() {
    const newSnake = new Array(initialSnakePartsNumber)
      .fill(null)
      .map((_, key) => {
        const partNumber = key + 1;

        return new SnakePart(
          this.snakePartSize,
          initialSnakeHeadPosition.x - (partNumber * this.snakePartSize),
          initialSnakeHeadPosition.y,
        );
      });
    this.parts = newSnake;
    this.direction = DirectionEnum.RIGHT;
    this.partToExclude = {};
  }

  // Make a step, deppending on the current direction.
  // Can move across the game border for reaches it.
  // @see tryToStepAcrossBorder()
  step() {
    const partsClonned = structuredClone(this.parts);
    let [snakeHead] = structuredClone(this.parts);
    switch (this.direction) {
      case DirectionEnum.UP:
        snakeHead.y = snakeHead.y - this.snakePartSize;
        break;
      case DirectionEnum.DOWN:
        snakeHead.y = snakeHead.y + this.snakePartSize;
        break;
      case DirectionEnum.RIGHT:
        snakeHead.x = snakeHead.x + this.snakePartSize;
        break;
      case DirectionEnum.LEFT:
        snakeHead.x = snakeHead.x - this.snakePartSize;
        break;
      default:
    }
    snakeHead = this.tryToStepAcrossBorder(snakeHead);

    // Add last snake part to a separated state, for the case the food is being eaten.
    // @see increment()
    this.partToExclude = partsClonned.at(-1);
    const snakeNewBody = structuredClone(partsClonned.slice(0, -1));

    this.parts = [snakeHead, ...snakeNewBody];
  }

  // Calculate the jump across the border.
  // Warning: Doesn't use nothung from the state.
  // @see tryToStepAcrossBorder()
  tryToStepAcrossBorder (newPositionCandidate) {
    if (newPositionCandidate.x < gameAreaMinPositionPercent) {
      newPositionCandidate.x = this.gameAreaMaxPositionPercent;
    }

    if (newPositionCandidate.x > this.gameAreaMaxPositionPercent) {
      newPositionCandidate.x = gameAreaMinPositionPercent;
    }

    if (newPositionCandidate.y < gameAreaMinPositionPercent) {
      newPositionCandidate.y = this.gameAreaMaxPositionPercent;
    }

    if (newPositionCandidate.y > this.gameAreaMaxPositionPercent) {
      newPositionCandidate.y = gameAreaMinPositionPercent;
    }
    
    return newPositionCandidate;
  }

  // Get the partToExclude object back as a snake part to incrase its size.
  // @see step()
  incrementSnake() {
    this.parts.push(this.partToExclude);
  }

  changeDirection(newDirection) {
    if (notAllowedDirectionChanges[newDirection] === this.direction) {
      return {};
    }
    this.direction = newDirection;
  }
}

export const objectToSnake = (snake) => (Object.assign(new Snake(), structuredClone(snake)));
