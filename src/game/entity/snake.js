import {
  gameAreaMinPositionPercent,
  gameAreaMaxPositionPercent,
  initialSnakeParts,
  stepSizePercent,
} from "../states/constants";

export default class Snake {
  constructor(parts) {
    this.parts = parts;
    this.partToExclude = {};
  }

  initializeSnake() {
    this.parts = structuredClone(initialSnakeParts);
    this.partToExclude = {};
  }

  // Make a step, deppending on the current direction.
  // Can move across the game border for reaches it.
  // @see tryToStepAcrossBorder()
  step(direction) {
    const partsClonned = structuredClone(this.parts);
    let [snakeHead] = structuredClone(this.parts);
    switch (direction) {
      case "UP":
        snakeHead.y = snakeHead.y - stepSizePercent;
        break;
      case "DOWN":
        snakeHead.y = snakeHead.y + stepSizePercent;
        break;
      case "RIGHT":
        snakeHead.x = snakeHead.x + stepSizePercent;
        break;
      case "LEFT":
        snakeHead.x = snakeHead.x - stepSizePercent;
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

  // Get the partToExclude object back as a snake part to incrase its size.
  // @see step()
  incrementSnake() {
    this.parts.push(this.partToExclude);
  }
}

export const objectToSnake = (snake) => (Object.assign(new Snake(), structuredClone(snake)));
