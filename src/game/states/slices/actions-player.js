import { objectToSnake } from "../../entity/snake";

export const actionsPlayerSlice = (set) => ({
  // Change the direction. Deny going to the opposite direction.
  changeDirection: newDirection => {
    set((state) => {
      const snakeObject = objectToSnake(state.snake);
      snakeObject.changeDirection(newDirection);
      return {snake: snakeObject};
    });
  },
});
