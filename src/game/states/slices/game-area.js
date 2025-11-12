import { objectToGameArea } from "../../entity/sets/game-area";

// Functions related to the main game area state and global sizes.
export const gameAreaSlice = (set) => ({
  // Update the main state with the game changes.
  updateGameArea: () => {
    set((state) => {
      const gameArea = objectToGameArea(state.gameArea);

      gameArea.clear();

      state.map.parts.forEach(part => {
        gameArea.push(part);
      });

      state.snake.parts.forEach(part => {
        gameArea.push(part);
      });

      gameArea.push(state.food);

      return {gameArea};
    });
  },

  setIsDesktop: (isDesktop) => {
    set(() => ({isDesktop}));
  },
});
