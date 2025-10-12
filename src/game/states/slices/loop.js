export const loopSlice = (get) => ({
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
