import { objectToGameArea } from "../../entity/sets/game-area";

// Functions related to the main game area state and global sizes.
export const gameAreaSlice = (set) => ({
  // Update the main state with the game changes.
  updateGameArea: () => {
    set((state) => {
      const gameArea = objectToGameArea(state.gameArea);

      const entitiesToRender = [
        ...state.map.parts,
        ...state.snake.parts,
        state.food,
      ];

      gameArea.update(entitiesToRender);

      return {gameArea};
    });
  },

  setIsDesktop: (isDesktop) => {
    set(() => ({isDesktop}));
  },
});
