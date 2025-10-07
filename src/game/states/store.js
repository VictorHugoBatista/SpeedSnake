import { create } from "zustand";

import { randomStep } from "../../helpers/numbers"

import {
  gameAreaMinPositionPercent,
  gameAreaMaxPositionPercent,
  iterationTimeInMilliseconds,
  notAllowedDirectionChanges,
  stepSizePercent,
} from "./constants";

const genStringPosition = position => {
  return `${position.x}_${position.y}`;
};

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
  isRunning: false,
  isPaused: false,
  showStartOverlay: true,
  showEndOverlay: false,
  timeSinceLastGameIteration: 0,

  // ------------------------------------------------------------
  // ------------------------------------------------------------

  // Change the direction. Deny going to the opposite direction.
  changeDirection: newDirection => {
    set((state) => {
      if (notAllowedDirectionChanges[newDirection] === state.direction) {
        return {direction: state.direction};
      }

      return {direction: newDirection};
    });
  },

  // ------------------------------------------------------------

  // Make a step, deppending on the current direction.
  // Can move across the game border for reaches it.
  // @see tryToStepAcrossBorder
  makeStep: () => {
    set((state) => {
      const snakeToStep = structuredClone(state.snake);
      let [snakeHead] = structuredClone(snakeToStep);
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
          break;
        default:
      }
      snakeHead = state.tryToStepAcrossBorder(snakeHead);

      // Add last snake part to a separated state, for the case the food is being eaten.
      // @see incrementSnake()
      const snakePartToExclude = snakeToStep.at(-1);
      const snakeNewBody = structuredClone(snakeToStep.slice(0, -1));

      const snakeMoved = [snakeHead, ...snakeNewBody];

      return {snake: snakeMoved, snakePartToExclude};
    });
  },

  // Calculate the jump across the border.
  // Warning: Doesn't use nothung from the state.
  // @see tryToStepAcrossBorder
  tryToStepAcrossBorder: (newPositionCandidate) => {
    if (newPositionCandidate.x < gameAreaMinPositionPercent) {
      newPositionCandidate.x = gameAreaMaxPositionPercent;
    }

    if (newPositionCandidate.x > gameAreaMaxPositionPercent) {
      newPositionCandidate.x = gameAreaMinPositionPercent;
    }

    if (newPositionCandidate.y < gameAreaMinPositionPercent) {
      newPositionCandidate.y = gameAreaMaxPositionPercent;
    }

    if (newPositionCandidate.y > gameAreaMaxPositionPercent) {
      newPositionCandidate.y = gameAreaMinPositionPercent;
    }
    
    return newPositionCandidate;
  },

  // ------------------------------------------------------------

  // If there's a collision, return the object with position and type.
  checkCollision: () => {
    const state = get();
    const [ newPosition ] = state.snake;
    const gameArea = state.gameArea;
    
    const collisionArray = Object.keys(gameArea).filter(key => key === genStringPosition(newPosition));

    if (! collisionArray.length) {
      return false;
    }

    const [ collision ] = collisionArray;

    return state.gameArea[collision];
  },

  // Execute different actions  the type of object from the collision.
  processCollision: (collision) => {
    const state = get();
    switch (collision.type) {
      case "food":
        state.incrementSnake();
        state.generateNewFoodLocation();
        break;
      case "snake":
      case "map":
        state.endGame();
        break;
      default:
    }
  },

  // ------------------------------------------------------------

  // Generate a new food location, but, if the new one
  // overlaps something in the game area, calculate again.
  generateNewFoodLocation: () => {
    set((state) => {
      let foodLocationString;
      const foodLocation = structuredClone(state.food);

      do {
        foodLocation.x = randomStep();
        foodLocation.y = randomStep();

        foodLocationString = genStringPosition(foodLocation);
      } while(state.gameArea[foodLocationString]);

      return {food: foodLocation};
    });
  },

  // Get the snakePartToExclude object back as a snake part to incrase its size.
  // @see makeStep()
  incrementSnake: () => {
    set((state) => {
      const snakeToUpdate = structuredClone(state.snake);
      snakeToUpdate.push((state.snakePartToExclude));
      return {snake: snakeToUpdate};
    });
  },

  // ------------------------------------------------------------

  startGame: () => {
    set(() => ({
      showStartOverlay: false,
      showEndOverlay: false,
      isRunning: true,
    }));
  },

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
        return {
          isPaused: false,
        };
      }

      return {
        isPaused: ! state.isPaused,
      };
    });
  },

  // ------------------------------------------------------------
  // ------------------------------------------------------------

  // Calculate if the current game loop iteration complete the actual game iteration time.
  // It sums the time in a state until it overflows, then back reset it to zero again.
  // @see mainLoopIteration()
  updateTime: deltaTime => {
    set((state) => {
      const newTime = state.timeSinceLastGameIteration + deltaTime;

      if (newTime < iterationTimeInMilliseconds) {
        return {timeSinceLastGameIteration: newTime};
      }

      return {timeSinceLastGameIteration: 0};
    });
  },

  // ------------------------------------------------------------
  // ------------------------------------------------------------

  // Update the main state with the game changes.
  updateGameArea: () => {
    set((state) => {
      const newGameArea = {};
      state.snake.forEach(part => {
        newGameArea[genStringPosition(part)] = part;
      });
      newGameArea[genStringPosition(state.food)] = state.food;

      return {gameArea: newGameArea};
    });
  },

  // ------------------------------------------------------------
  // ------------------------------------------------------------

  // Main loop.
  mainLoopIteration: (deltaTime) => {
    const state = get();

    // If iteration time state not back to zero, isn't time for execute the game iteration.
    // @see updateTime()
    state.updateTime(deltaTime);
    if (state.timeSinceLastGameIteration > 0) {
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
}));
