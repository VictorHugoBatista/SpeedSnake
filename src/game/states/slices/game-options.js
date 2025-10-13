
export const gameOptions = (set) => ({
  setDifficulty: (newDifficulty) => {
    set(() => ({
      difficulty: newDifficulty,
    }));
  },
});
