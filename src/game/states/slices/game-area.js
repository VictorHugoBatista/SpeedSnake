// Functions related to the main game area state and global sizes.
export const gameAreaSlice = (set) => ({
  // Update the main state with the game changes.
  updateGameArea: () => {
    set((state) => {
      const newGameArea = [];

      state.map.parts.forEach(part => {
        newGameArea.push(part);
      });

      state.snake.parts.forEach(part => {
        newGameArea.push(part);
      });

      newGameArea.push(state.food);

      return {gameArea: newGameArea};
    });
  },

  setIsDesktop: (isDesktop) => {
    set(() => ({isDesktop}));
  },
});
