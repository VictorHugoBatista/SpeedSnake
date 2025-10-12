import { create } from "zustand";

import Food, { objectToFood } from "../entity/food";
import Snake, { objectToSnake } from "../entity/snake";
import { objectToSnakePart } from "../entity/snake-part";

import {
  gameAreaMinPositionPercent,
  gameAreaMaxPositionPercent,
  iterationTimeInMilliseconds,
  readyCountTimeInMilliseconds,
  notAllowedDirectionChanges,
  gameEntitySizePercent,
} from "./constants";

import { collisionsSlice } from "./slices/collisions";
import { gameAreaSlice } from "./slices/game-area";
import { loopSlice } from "./slices/loop";

export const useGameStore = create((set, get) => ({
  // Main state, the game area will reflect what is here.
  gameArea: {},

  // Game loop iterators.
  readyCountTimeAccumulator: 0.1,
  readyCountTimeRegressive: 0,
  gameLoopIterationTimeAccumulator: 0,

  // Main game rule states.
  direction: "",
  snake: new Snake(gameEntitySizePercent, []),
  food: new Food(gameEntitySizePercent, 0, 0),

  // Game execution states.
  isRunning: false,
  isPaused: false,
  showStartOverlay: true,
  showReadyCountOverlay: false,
  showEndOverlay: false,

  // ------------------------------------------------------------
  // ------------------------------------------------------------

  // Change the direction. Deny going to the opposite direction.
  changeDirection: newDirection => {
    set((state) => {
      if (notAllowedDirectionChanges[newDirection] === state.direction) {
        return {};
      }

      return {direction: newDirection};
    });
  },

  // ------------------------------------------------------------

  // Make a step, deppending on the current direction.
  // Can move across the game border for reaches it.
  makeStep: () => {
    set((state) => {
      const snakeObject = objectToSnake(state.snake);
      snakeObject.step(state.direction);

      return {snake: snakeObject};
    });
  },

  // ------------------------------------------------------------

  ...collisionsSlice(get),

  // ------------------------------------------------------------

  // Generate a new food location, but, if the new one
  // overlaps something in the game area, calculate again.
  generateNewFoodLocation: () => {
    set((state) => {
      let foodLocationString;
      const newFoodObject = objectToFood(state.food);

      do {
        newFoodObject.generateNewLocation(
          gameAreaMinPositionPercent,
          gameAreaMaxPositionPercent,
        );

        const foddObject = objectToSnakePart(newFoodObject);
        foodLocationString = foddObject.getStringPosition();
      } while(state.gameArea[foodLocationString]);

      return {food: newFoodObject};
    });
  },

  // Get the snake.partToExclude object back as a snake part to incrase its size.
  incrementSnake: () => {
    set((state) => {
      const snakeObject = objectToSnake(state.snake);
      snakeObject.incrementSnake();

      return {snake: snakeObject};
    });
  },

  // ------------------------------------------------------------
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

  // Initialize snake, the direction and reset food location in the states.
  // Hide all overlays.
  startGame: () => {
    set((state) => {
      state.generateNewFoodLocation();

      const snakeObject = objectToSnake(state.snake);
      snakeObject.initializeSnake();

      return {
        direction: "RIGHT",
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

  // ------------------------------------------------------------
  // ------------------------------------------------------------

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

  // ------------------------------------------------------------
  // ------------------------------------------------------------

  ...gameAreaSlice(set),
  ...loopSlice(get),
}));
