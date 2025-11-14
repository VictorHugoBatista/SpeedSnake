import {
  gameAreaMinPositionPercent,
  initialSnakeHeadPosition,
  initialSnakePartsNumber,
  notAllowedDirectionChanges,
} from "../../constants";

import SnakePart from "../snake-part";

import { DirectionEnum } from "../../enums/directions";

export default class Snake {
  constructor() {
    this.parts = [];
    this.canChangeDirection = true;
    this._direction = "";
    this._partToExclude = {};
  }

  initializeSnake(partSize) {
    const newSnake = new Array(initialSnakePartsNumber)
      .fill(null)
      .map((_, key) => {
        const partNumber = key + 1;

        return new SnakePart(
          initialSnakeHeadPosition.x - (partNumber * partSize),
          initialSnakeHeadPosition.y,
          partSize,
        );
      });
    this.parts = newSnake;
    this._direction = DirectionEnum.RIGHT;
    this._partToExclude = {};
  }

  // Make a step, deppending on the current direction.
  // Can move across the game border for reaches it.
  // @see _tryToStepAcrossBorder()
  step(partSize) {
    const partsClonned = structuredClone(this.parts);
    let [snakeHead] = structuredClone(this.parts);
    switch (this._direction) {
      case DirectionEnum.UP:
        snakeHead.y = snakeHead.y - partSize;
        break;
      case DirectionEnum.DOWN:
        snakeHead.y = snakeHead.y + partSize;
        break;
      case DirectionEnum.RIGHT:
        snakeHead.x = snakeHead.x + partSize;
        break;
      case DirectionEnum.LEFT:
        snakeHead.x = snakeHead.x - partSize;
        break;
      default:
    }
    snakeHead = this._tryToStepAcrossBorder(snakeHead, partSize);

    // Add last snake part to a separated state, for the case the food is being eaten.
    // @see increment()
    this._partToExclude = partsClonned.at(-1);
    const snakeNewBody = structuredClone(partsClonned.slice(0, -1));

    this.parts = [snakeHead, ...snakeNewBody];

    this.canChangeDirection = true;
  }

  // Get the _partToExclude object back as a snake part to incrase its size.
  // @see step()
  incrementSnake() {
    this.parts.push(this._partToExclude);
  }

  changeDirection(newDirection) {
    if (notAllowedDirectionChanges[newDirection] === this._direction) {
      return {};
    }
    this._direction = newDirection;
    this.canChangeDirection = false;
  }

  // Calculate the jump across the border.
  _tryToStepAcrossBorder(newPositionCandidate) {
    const gameAreaMaxPositionPercent = 100 - this._partToExclude.sizeX;
    if (newPositionCandidate.x < gameAreaMinPositionPercent) {
      newPositionCandidate.x = gameAreaMaxPositionPercent;
    }

    if (newPositionCandidate.x > gameAreaMaxPositionPercent) {
      newPositionCandidate.x = gameAreaMinPositionPercent;
    }

    if (newPositionCandidate.y < gameAreaMinPositionPercent) {
      newPositionCandidate.y = gameAreaMaxPositionPercent;
    }

    if (newPositionCandidate.y > gameAreaMaxPositionPercent) {
      newPositionCandidate.y = gameAreaMinPositionPercent;
    }
    
    return newPositionCandidate;
  }
}

export const objectToSnake = (snake) => (Object.assign(new Snake(), structuredClone(snake)));
