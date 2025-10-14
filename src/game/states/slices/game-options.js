import { difficultiesToTimeInMilliseconds } from "../../constants";

export const gameOptions = (get, set) => ({
  initializeGameFromOptions: () => {
    const state = get();

    state.setEntitySize();
    state.setUpdateIterationTime();
  },

  setDifficulty: (newDifficulty) => {
    set(() => ({
      difficulty: newDifficulty,
    }));
  },

  // Update the global entity size.
  setEntitySize: () => {
    set((state) => {
      const newSize = state.isDesktop ? 2.5 : 5;

      return {
        entitySize: newSize,
      };
    });
  },

  // Set the updateIteratuionTime according to the selected game difficulty.
  setUpdateIterationTime: () => {
    set((state) => {
      const difficultu = state.difficulty;
      const newIderationTime = difficultiesToTimeInMilliseconds[difficultu];

      return {
        iterationTimeInMilliseconds: newIderationTime,
      };
    });
  },
});
