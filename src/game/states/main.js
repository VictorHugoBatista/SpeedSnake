import { create } from "zustand";

import Food from "../entity/food";
import Snake from "../entity/snake";

import { actionsGameSlice } from "./slices/actions-game";
import { actionsPlayerSlice } from "./slices/actions-player";
import { collisionsSlice } from "./slices/collisions";
import { gameAreaSlice } from "./slices/game-area";
import { gamePhasesSlice } from "./slices/game-phases";
import { loopSlice } from "./slices/loop";

export const useGameStore = create((set, get) => ({
  // Main state, the game area will reflect what is here.
  gameArea: {},

  // Game loop iterators.
  readyCountTimeAccumulator: 0.1,
  readyCountTimeRegressive: 0,
  gameLoopIterationTimeAccumulator: 0,

  // Main game entities.
  snake: new Snake(0),
  food: new Food(0),
  entitySize: 0,

  // Game execution states.
  isRunning: false,
  isPaused: false,
  showStartOverlay: true,
  showReadyCountOverlay: false,
  showEndOverlay: false,

  ...actionsPlayerSlice(set),
  ...actionsGameSlice(set),
  ...collisionsSlice(get),
  ...gamePhasesSlice(set),
  ...gameAreaSlice(set),
  ...loopSlice(get, set),
}));
