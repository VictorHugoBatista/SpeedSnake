import { objectToSnake } from "../../entity/snake";

// Treats all the game phase changes.
export const gamePhasesSlice = (set) => ({
  // Initialize the ready count and hide all other overlays.
  startReadyCount: () => {
    set((state) => {
      if (state.isRunning) {
        return {};
      }

      return {
        showStartOverlay: false,
        showEndOverlay: false,
        showReadyCountOverlay: true,
      };
    });
  },

  setEntitySize: (newSize) => {
    set(() => ({entitySize: newSize}));
  },

  // Initialize snake, the direction and reset food location in the states.
  // Hide all overlays.
  startGame: () => {
    set((state) => {
      state.generateNewFoodLocation();

      const snakeObject = objectToSnake(state.snake);
      snakeObject.initializeSnake(state.entitySize);

      return {
        snake: snakeObject,
        showStartOverlay: false,
        showEndOverlay: false,
        showReadyCountOverlay: false,
        isRunning: true,
      };
    });
  },

  // Stop game through the isRunning state and show end game overlay.
  endGame: () => {
    set(() => ({
      showEndOverlay: true,
      isRunning: false,
    }));
  },

  // Pausing / unpausing operations.
  togglePause: () => {
    set((state) => {
      if (! state.isRunning) {
        return {};
      }

      return {
        isPaused: ! state.isPaused,
      };
    });
  },
});
