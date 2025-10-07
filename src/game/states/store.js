import { create } from "zustand";

import { randomStep } from "../../helpers/numbers"

import {
  iterationTimeInMilliseconds,
  notAllowedDirectionChanges,
  stepSizePercent,
} from "./constants";

export const useGameStore = create((set, get) => ({
  // Data.
  direction: "RIGHT",
  snake: [
    {
      x: 50,
      y: 50,
      size: stepSizePercent,
      type: "snake",
    },
    {
      x: 50 - stepSizePercent,
      y: 50,
      size: stepSizePercent,
      type: "snake",
    },
    {
      x: 50 - stepSizePercent * 2,
      y: 50,
      size: stepSizePercent,
      type: "snake",
    },
    {
      x: 50 - stepSizePercent * 3,
      y: 50,
      size: stepSizePercent,
      type: "snake",
    },
    {
      x: 50 - stepSizePercent * 4,
      y: 50,
      size: stepSizePercent,
      type: "snake",
    },
  ],
  snakePartToExclude: {},
  food: {
    x: 60,
    y: 50,
    size: stepSizePercent,
    type: "food",
  },
  gameArea: {},
  isPaused: false,
  timeForNextLoopIteration: 0,

  // ------------------------------------------------------------

  // Direction operations.
  changeDirection: newDirection => {
    set((state) => {
      if (notAllowedDirectionChanges[newDirection] === state.direction) {
        return {direction: state.direction};
      }

      return {direction: newDirection};
    });
  },

  // ------------------------------------------------------------

  // Movement operations.
  makeStep: () => {
    set((state) => {
      const snakeToStep = structuredClone(state.snake);
      const [snakeHead] = structuredClone(snakeToStep);
      switch (state.direction) {
        case "UP":
          snakeHead.y = snakeHead.y - stepSizePercent;
          break;
        case "DOWN":
          snakeHead.y = snakeHead.y + stepSizePercent;
          break;
        case "RIGHT":
          snakeHead.x = snakeHead.x + stepSizePercent;
          break;
        case "LEFT":
          snakeHead.x = snakeHead.x - stepSizePercent;
      }

      const snakePartToExclude = snakeToStep.at(-1);
      const snakeNewBody = structuredClone(snakeToStep.slice(0, -1));

      const snakeMoved = [snakeHead, ...snakeNewBody];

      return {snake: snakeMoved, snakePartToExclude};
    });
  },

  updateGameArea: () => {
    set((state) => {
      const newGameArea = {};
      state.snake.forEach(part => {
        newGameArea[`${part.x}_${part.y}`] = part;
      });
      newGameArea[`${state.food.x}_${state.food.y}`] = state.food;

      return {gameArea: newGameArea};
    });
  },

  // ------------------------------------------------------------

  // Collisions and positioning.
  checkCollision: () => {
    const state = get();
    const [ newPosition ] = state.snake;
    const gameArea = state.gameArea;
    
    const collisionArray = Object.keys(gameArea).filter(key => key === `${newPosition.x}_${newPosition.y}`);

    if (! collisionArray.length) {
      return false;
    }

    const [ collision ] = collisionArray;

    return state.gameArea[collision];
  },

  processCollision: (collision) => {
    const state = get();
    switch (collision.type) {
      case "food":
        state.incrementSnake();
        state.generateNewFood();
        break;
      case "snake":
      case "map":
        // finish the game
    }
  },

  // ------------------------------------------------------------

  // Adding snake part and food operations.
  generateNewFood: () => {
    set((state) => {
      const oldFoodLocation = structuredClone(state.food);
      oldFoodLocation.x = randomStep();
      oldFoodLocation.y = randomStep();
      return {food: oldFoodLocation};
    });
  },

  incrementSnake: () => {
    set((state) => {
      const snakeToUpdate = structuredClone(state.snake);
      snakeToUpdate.push((state.snakePartToExclude));
      return {snake: snakeToUpdate};
    });
  },

  // ------------------------------------------------------------

  // Pausing / unpausing operations.
  togglePause: () => {
    set((state) => ({
      isPaused: ! state.isPaused,
    }));
  },

  // ------------------------------------------------------------

  // Calculate if the current game loop iteration complete the actual game iteration time.
  // It sums the time in a state until it overflows, then back reset it to zero again.
  // @see mainLoopIteration
  updateTime: deltaTime => {
    set((state) => {
      const newTime = state.iterationTimeInMilliseconds + deltaTime;

      if (newTime < iterationTimeInMilliseconds) {
        return {iterationTimeInMilliseconds: newTime};
      }

      return {iterationTimeInMilliseconds: 0};
    });
  },

  // ------------------------------------------------------------

  // Main loop.
  mainLoopIteration: (deltaTime) => {
    const state = get();

    // If iteration time state not back to zero, isn't time for execute the game iteration.
    // @see updateTime
    state.updateTime(deltaTime);
    if (state.iterationTimeInMilliseconds > 0) {
      return;
    }

    if (state.isPaused) {
      return;
    }

    state.makeStep();

    const collision = state.checkCollision();
    if (collision) {
      state.processCollision(collision);
    }

    state.updateGameArea();
  },
}));
