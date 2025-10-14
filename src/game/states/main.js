import { create } from "zustand";

import Food from "../entity/food";
import Snake from "../entity/snake";

import { Difficulty } from "../enums/difficulty";

import { actionsGameSlice } from "./slices/actions-game";
import { actionsPlayerSlice } from "./slices/actions-player";
import { collisionsSlice } from "./slices/collisions";
import { gameAreaSlice } from "./slices/game-area";
import { gameOptions } from "./slices/game-options";
import { gamePhasesSlice } from "./slices/game-phases";
import { loopSlice } from "./slices/loop";

export const useGameStore = create((set, get) => ({
  isDesktop: true,

  // Main state, the game area will reflect what is here.
  gameArea: {},

  // Game options.
  // Update the 'iterationTimeInMilliseconds' state.
  difficulty: Difficulty.FAST,

  // Update the entities size in the 'snake' and 'food' states.
  entitySize: 0,

  // Game loop iterators.
  readyCountTimeAccumulator: 0.1,
  readyCountTimeRegressive: 0,
  gameLoopIterationTimeAccumulator: 0,
  iterationTimeInMilliseconds: 500,

  // Main game entities.
  snake: new Snake(),
  food: new Food(),

  // Game execution states.
  isRunning: false,
  isPaused: false,
  showStartOverlay: true,
  showReadyCountOverlay: false,
  showEndOverlay: false,

  ...gameOptions(get, set),
  ...actionsPlayerSlice(set),
  ...actionsGameSlice(set),
  ...collisionsSlice(get),
  ...gamePhasesSlice(get, set),
  ...gameAreaSlice(set),
  ...loopSlice(get, set),
}));
