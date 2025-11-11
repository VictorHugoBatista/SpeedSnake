import {
  difficultiesToTimeInMilliseconds,
  mobileDifficultyDifference,
} from "../../constants";

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

  setMap: (newMap) => {
    set(() => ({
      map: newMap,
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
      const difficulty = state.difficulty;
      let newIderationTime = difficultiesToTimeInMilliseconds[difficulty];

      if (! state.isDesktop) {
        newIderationTime += mobileDifficultyDifference;
      }

      return {
        iterationTimeInMilliseconds: newIderationTime,
      };
    });
  },
});
