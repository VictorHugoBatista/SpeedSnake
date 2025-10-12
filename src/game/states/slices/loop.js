import {
  iterationTimeInMilliseconds,
  readyCountTimeInMilliseconds,
} from "../../constants";

export const loopSlice = (get, set) => ({
  // Calculate if the current passed time complete the total ready screen time.
  // Also, calculate the regressive time in seconds, for showing in the component.
  // @see readyCountLoopIteration()
  updateReadyCountIderationTime: deltaTime => {
    set((state) => {
      const newTime = state.readyCountTimeAccumulator + deltaTime;
      const newTimeRegressive = Math.trunc((readyCountTimeInMilliseconds / 1000) - (state.readyCountTimeAccumulator / 1000)) + 1;

      if (newTime < readyCountTimeInMilliseconds) {
        return {
          readyCountTimeAccumulator: newTime,
          readyCountTimeRegressive: newTimeRegressive <= (readyCountTimeInMilliseconds / 1000)  ? newTimeRegressive : 0,
        };
      }

      return {
        readyCountTimeAccumulator: 0,
        readyCountTimeRegressive: 0,
      };
    });
  },

  // Ready count screen. It calculates the time and changes to the game loop.
  // @see updateReadyCountIderationTime()
  readyCountLoopIteration: (deltaTime) => {
    const state = get();

    state.updateReadyCountIderationTime(deltaTime);

    if (state.readyCountTimeAccumulator > 0) {
      return;
    }

    state.startGame();
  },

  // Calculate if the current game loop iteration complete the actual game iteration time.
  // It sums the time in a state until it overflows, then back reset it to zero again.
  // @see gameLoopIteration()
  updateGameLoopIderationTime: deltaTime => {
    set((state) => {
      const newTime = state.gameLoopIterationTimeAccumulator + deltaTime;

      if (newTime < iterationTimeInMilliseconds) {
        return {gameLoopIterationTimeAccumulator: newTime};
      }

      return {gameLoopIterationTimeAccumulator: 0};
    });
  },

  // It treats all game rules.
  gameLoopIteration: (deltaTime) => {
    const state = get();

    // If iteration time state not back to zero, isn't time for execute the game iteration.
    // @see updateGameLoopIderationTime()
    state.updateGameLoopIderationTime(deltaTime);
    if (state.gameLoopIterationTimeAccumulator > 0) {
      return;
    }

    if (state.isPaused || ! state.isRunning) {
      return;
    }

    state.makeStep();

    const collision = state.checkCollision();
    if (collision) {
      state.processCollision(collision);
    }

    state.updateGameArea();
  },

  // Main loop.
  mainLoopIteration: (deltaTime) => {
    const state = get();

    if (state.showReadyCountOverlay) {
      state.readyCountLoopIteration(deltaTime);
    }

    state.gameLoopIteration(deltaTime);
  },
});
