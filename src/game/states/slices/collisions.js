import { objectToGameArea } from "../../entity/sets/game-area";

import { EntityType } from "../../enums/entity-type";

// Collision checks and its different processings.
export const collisionsSlice = (get) => ({
  // If there's a collision, return the object with position and type.
  checkCollision: () => {
    const state = get();
    const [ newPosition ] = state.snake.parts;
    const gameArea = objectToGameArea(state.gameArea);

    return gameArea.getCollisionEntitiy(newPosition);
  },

  // Execute different actions  the type of object from the collision.
  processCollision: (collision) => {
    const state = get();
    switch (collision.type) {
      case EntityType.FOOD:
        state.incrementSnake();
        state.generateNewFoodLocation();
        break;
      case EntityType.SNAKE:
      case EntityType.MAP:
        state.endGame();
        break;
      default:
    }
  },
});
