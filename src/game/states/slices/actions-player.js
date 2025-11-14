import { objectToSnake } from "../../entity/sets/snake";

// Actions started by the player.
export const actionsPlayerSlice = (set) => ({
  // Change the direction. Deny going to the opposite direction.
  changeDirection: newDirection => {
    set((state) => {
      if (! state.isRunning || state.isPaused || ! state.snake.canChangeDirection) {
        return {};
      }

      const snakeObject = objectToSnake(state.snake);
      snakeObject.changeDirection(newDirection);
      return {snake: snakeObject};
    });
  },
});
