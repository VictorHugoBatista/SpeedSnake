
export const gameOptions = (get, set) => ({
  initializeGameFromOptions: () => {
    const state = get();

    state.setEntitySize();
  },

  setDifficulty: (newDifficulty) => {
    set(() => ({
      difficulty: newDifficulty,
    }));
  },
});
