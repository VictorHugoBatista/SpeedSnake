import {create} from "zustand";

import { constants } from "./constants";

export const useGameStore = create(set => ({
  direction: "RIGHT",
  snake: [
    {
      x: 50,
      y: 50,
      size: constants.stepSizePercent,
      type: "snake",
    },
    {
      x: 50 - constants.stepSizePercent,
      y: 50,
      size: constants.stepSizePercent,
      type: "snake",
    },
    {
      x: 50 - constants.stepSizePercent * 2,
      y: 50,
      size: constants.stepSizePercent,
      type: "snake",
    },
    {
      x: 50 - constants.stepSizePercent * 3,
      y: 50,
      size: constants.stepSizePercent,
      type: "snake",
    },
    {
      x: 50 - constants.stepSizePercent * 4,
      y: 50,
      size: constants.stepSizePercent,
      type: "snake",
    },
  ],
  food: {
    x: 95,
    y: 95,
    size: constants.stepSizePercent,
    type: "snake",
  },
  gameArea: {},

  changeDirection: newDirection => {
    set(() => ({direction: newDirection}));
  },

  makeStep: () => {
    set((state) => {
      const snakeToStep = structuredClone(state.snake);
      const [snakeHead] = structuredClone(snakeToStep);
      switch (state.direction) {
        case "UP":
          snakeHead.y = snakeHead.y - constants.stepSizePercent;
          break;
        case "DOWN":
          snakeHead.y = snakeHead.y + constants.stepSizePercent;
          break;
        case "RIGHT":
          snakeHead.x = snakeHead.x + constants.stepSizePercent;
          break;
        case "LEFT":
          snakeHead.x = snakeHead.x - constants.stepSizePercent;
      }

      const snakeNewBody = structuredClone(snakeToStep.slice(0, -1));

      const snakeMoved = [snakeHead, ...snakeNewBody];

      return {snake: snakeMoved};
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

  addSnakeItem: part => {
    set((state) => {
      const snakeToUpdate = structuredClone(state.snake);
      part.size = constants.stepSizePercent;
      snakeToUpdate.push((part));
      return {snake: snakeToUpdate};
    });
  },
}));
