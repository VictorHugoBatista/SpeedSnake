import { objectToSnakePart } from "../../entity/snake-part";

// Collision checks and its different processings.
export const collisionsSlice = (get) => ({
  // If there's a collision, return the object with position and type.
  checkCollision: () => {
    const state = get();
    const [ newPosition ] = state.snake.parts;
    const gameArea = state.gameArea;
    
    const snakePartObject = objectToSnakePart(newPosition);
    const collisionArray = Object.keys(gameArea).filter(key => key === snakePartObject.getStringPosition());

    if (! collisionArray.length) {
      return false;
    }

    const [ collision ] = collisionArray;

    return state.gameArea[collision];
  },

  // Execute different actions  the type of object from the collision.
  processCollision: (collision) => {
    const state = get();
    switch (collision.type) {
      case "food":
        state.incrementSnake();
        state.generateNewFoodLocation();
        break;
      case "snake":
      case "map":
        state.endGame();
        break;
      default:
    }
  },
});
