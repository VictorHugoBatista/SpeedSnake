import { objectToFood } from "../../entity/food";
import { objectToSnakePart } from "../../entity/snake-part";

// Functions related to the main game area state and global sizes.
export const gameAreaSlice = (set) => ({
  // Update the main state with the game changes.
  updateGameArea: () => {
    set((state) => {
      const newGameArea = {};
      state.snake.parts.forEach(part => {
        const snakePartObject = objectToSnakePart(part);
        newGameArea[snakePartObject.getStringPosition()] = part;
      });

      const foodObject = objectToFood(state.food);
      newGameArea[foodObject.getStringPosition()] = state.food;

      return {gameArea: newGameArea};
    });
  },

  // Update the global entity size.
  setEntitySize: (newSize) => {
    set(() => ({entitySize: newSize}));
  },
});
