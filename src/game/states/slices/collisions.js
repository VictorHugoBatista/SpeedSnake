import { objectToEntity } from "../../entity/forms/entity";
import { objectToSnakePart } from "../../entity/snake-part";

import { EntityType } from "../../enums/entity-type";

// Collision checks and its different processings.
export const collisionsSlice = (get) => ({
  // If there's a collision, return the object with position and type.
  checkCollision: () => {
    const state = get();
    const [ newPosition ] = state.snake.parts;
    const gameArea = state.gameArea;
    
    const snakePartObject = objectToSnakePart(newPosition);
    const collisionArray = gameArea.filter(entityObject => {
      const entity = objectToEntity(entityObject);
      return entity.isPositionInside(snakePartObject.x, snakePartObject.y);
    });

    if (! collisionArray.length) {
      return false;
    }

    const [ collision ] = collisionArray;

    return collision;
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
