import {create} from "zustand";

import { stepSizePercent, notAllowedDirectionChanges } from "./constants";

export const useGameStore = create(set => ({
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
  food: {
    x: 95,
    y: 95,
    size: stepSizePercent,
    type: "snake",
  },
  gameArea: {},

  changeDirection: newDirection => {
    set((state) => {
      if (notAllowedDirectionChanges[newDirection] === state.direction) {
        return {direction: state.direction};
      }

      return {direction: newDirection};
    });
  },

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
      part.size = stepSizePercent;
      snakeToUpdate.push((part));
      return {snake: snakeToUpdate};
    });
  },
}));
