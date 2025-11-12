import { objectToFood } from "../../entity/food";
import { objectToGameArea } from "../../entity/sets/game-area";
import { objectToSnake } from "../../entity/sets/snake";

// Automatic actions made by the game.
export const actionsGameSlice = (set) => ({
  // Make a step, deppending on the current direction.
  // Can move across the game border for reaches it.
  makeStep: () => {
    set((state) => {
      const snakeObject = objectToSnake(state.snake);
      snakeObject.step(state.entitySize);

      return {snake: snakeObject};
    });
  },

  // Generate a new food location, but, if the new one
  // overlaps something in the game area, calculate again.
  generateNewFoodLocation: () => {
    set((state) => {
      const newFoodObject = objectToFood(state.food);
      const gameArea = objectToGameArea(state.gameArea);

      do {
        newFoodObject.generateNewLocation(state.entitySize);
      } while(gameArea.getCollisionEntitiy(newFoodObject));

      return {food: newFoodObject};
    });
  },

  // Get the snake.partToExclude object back as a snake part to incrase its size.
  incrementSnake: () => {
    set((state) => {
      const snakeObject = objectToSnake(state.snake);
      snakeObject.incrementSnake();

      return {snake: snakeObject};
    });
  },
});
