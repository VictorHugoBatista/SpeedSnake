import { objectToFood } from "../../entity/food";
import { objectToSnakePart } from "../../entity/snake-part";
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
      // let foodLocationString;
      const newFoodObject = objectToFood(state.food);

      // do {
        newFoodObject.generateNewLocation(state.entitySize);

        // const foddObject = objectToSnakePart(newFoodObject);
        // foodLocationString = foddObject.getStringPosition();
      // } while(state.gameArea[foodLocationString]);

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
